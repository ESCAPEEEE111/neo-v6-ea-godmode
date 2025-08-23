from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from datetime import datetime, date
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path
import os
import json
import asyncio
import uuid

# Import our modules
from config import settings
from database import connect_to_db, close_db_connection, get_database
from models import *
from services.email_service import email_service
from services.ai_service import ai_service

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="NOWHERE Digital API",
    description="Comprehensive digital marketing agency platform API",
    version="1.0.0",
    debug=settings.debug
)

# Security
security = HTTPBearer()

# Create API router
api_router = APIRouter(prefix=settings.api_prefix)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Analytics middleware
class AnalyticsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = datetime.utcnow()
        
        # Track page views
        if request.method == "GET":
            await self.track_page_view()
        
        response = await call_next(request)
        
        # Log API calls
        process_time = (datetime.utcnow() - start_time).total_seconds()
        logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.3f}s")
        
        return response
    
    async def track_page_view(self):
        try:
            db = get_database()
            today = date.today().isoformat()  # Convert to string
            
            # Update or create today's analytics
            await db.analytics.update_one(
                {"analytics_date": today},
                {"$inc": {"page_views": 1}},
                upsert=True
            )
        except Exception as e:
            logger.error(f"Error tracking page view: {e}")

app.add_middleware(AnalyticsMiddleware)

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow(), "service": "nowhere-digital-api"}

# Contact Form Endpoints
@api_router.post("/contact", response_model=StandardResponse)
async def create_contact_form(
    contact_data: ContactFormCreate,
    background_tasks: BackgroundTasks
):
    """Submit contact form"""
    try:
        db = get_database()
        
        # Create contact form entry
        contact_form = ContactForm(**contact_data.dict())
        
        # Save to database
        await db.contact_forms.insert_one(contact_form.dict())
        
        # Send emails in background
        background_tasks.add_task(
            email_service.send_contact_form_notification, 
            contact_form.dict()
        )
        background_tasks.add_task(
            email_service.send_contact_confirmation, 
            contact_form.dict()
        )
        
        # Track analytics
        await db.analytics.update_one(
            {"analytics_date": date.today().isoformat()},
            {"$inc": {"contact_forms": 1}},
            upsert=True
        )
        
        return StandardResponse(
            success=True,
            message="Contact form submitted successfully. We'll get back to you soon!",
            data={"id": contact_form.id}
        )
        
    except Exception as e:
        logger.error(f"Error creating contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms(
    status: Optional[ContactStatus] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    """Get contact forms (admin only)"""
    try:
        db = get_database()
        
        # Build query
        query = {}
        if status:
            query["status"] = status
        
        # Get contact forms
        cursor = db.contact_forms.find(query).skip(skip).limit(limit).sort("created_at", -1)
        contact_forms = await cursor.to_list(length=limit)
        
        return [ContactForm(**form) for form in contact_forms]
        
    except Exception as e:
        logger.error(f"Error getting contact forms: {e}")
        raise HTTPException(status_code=500, detail="Failed to get contact forms")

@api_router.put("/contact/{contact_id}", response_model=StandardResponse)
async def update_contact_form(
    contact_id: str,
    update_data: ContactFormUpdate
):
    """Update contact form status"""
    try:
        db = get_database()
        
        # Update contact form
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        update_dict["updated_at"] = datetime.utcnow()
        
        result = await db.contact_forms.update_one(
            {"id": contact_id},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact form not found")
        
        return StandardResponse(
            success=True,
            message="Contact form updated successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to update contact form")

# AI Chat Endpoints
@api_router.post("/chat/session", response_model=StandardResponse)
async def create_chat_session(
    user_id: Optional[str] = None
):
    """Create a new chat session"""
    try:
        db = get_database()
        
        # Create chat session
        session = ChatSession(
            session_id=str(uuid.uuid4()),
            user_id=user_id
        )
        
        # Save to database
        await db.chat_sessions.insert_one(session.dict())
        
        # Track analytics
        await db.analytics.update_one(
            {"analytics_date": date.today().isoformat()},
            {"$inc": {"chat_sessions": 1}},
            upsert=True
        )
        
        return StandardResponse(
            success=True,
            message="Chat session created successfully",
            data={"session_id": session.session_id}
        )
        
    except Exception as e:
        logger.error(f"Error creating chat session: {e}")
        raise HTTPException(status_code=500, detail="Failed to create chat session")

@api_router.post("/chat/message", response_model=StandardResponse)
async def send_chat_message(
    message_data: ChatMessageCreate
):
    """Send a message to AI chat"""
    try:
        db = get_database()
        
        # Get AI response
        ai_response = await ai_service.send_chat_message(
            message_data.session_id,
            message_data.message
        )
        
        # Create chat message
        chat_message = ChatMessage(
            session_id=message_data.session_id,
            user_id=message_data.user_id,
            message=message_data.message,
            response=ai_response
        )
        
        # Save to database
        await db.chat_messages.insert_one(chat_message.dict())
        
        # Update session
        await db.chat_sessions.update_one(
            {"session_id": message_data.session_id},
            {"$inc": {"total_messages": 1}}
        )
        
        return StandardResponse(
            success=True,
            message="Message sent successfully",
            data={"response": ai_response}
        )
        
    except Exception as e:
        logger.error(f"Error sending chat message: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(
    session_id: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    """Get chat history for a session"""
    try:
        db = get_database()
        
        # Get chat messages
        cursor = db.chat_messages.find(
            {"session_id": session_id}
        ).skip(skip).limit(limit).sort("created_at", 1)
        
        messages = await cursor.to_list(length=limit)
        
        return [ChatMessage(**msg) for msg in messages]
        
    except Exception as e:
        logger.error(f"Error getting chat history: {e}")
        raise HTTPException(status_code=500, detail="Failed to get chat history")

# Content Generation Endpoints
@api_router.post("/content/generate", response_model=StandardResponse)
async def generate_content(
    content_request: ContentGenerationCreate,
    background_tasks: BackgroundTasks
):
    """Generate content using AI"""
    try:
        db = get_database()
        
        # Generate content
        generated_content = await ai_service.generate_content(
            content_request.content_type,
            content_request.prompt
        )
        
        # Create content record
        content_record = ContentGeneration(
            user_id=content_request.user_id,
            content_type=content_request.content_type,
            prompt=content_request.prompt,
            generated_content=generated_content
        )
        
        # Save to database
        await db.content_generation.insert_one(content_record.dict())
        
        return StandardResponse(
            success=True,
            message="Content generated successfully",
            data={"content": generated_content, "id": content_record.id}
        )
        
    except Exception as e:
        logger.error(f"Error generating content: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate content")

@api_router.get("/content/recommendations")
async def get_service_recommendations(
    business_info: str = Query(..., description="Business information and needs")
):
    """Get AI-powered service recommendations"""
    try:
        recommendations = await ai_service.generate_service_recommendations(business_info)
        
        return StandardResponse(
            success=True,
            message="Recommendations generated successfully",
            data={"recommendations": recommendations}
        )
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")

# Portfolio Endpoints
@api_router.post("/portfolio", response_model=StandardResponse)
async def create_portfolio_item(
    portfolio_data: PortfolioCreate
):
    """Create a new portfolio item"""
    try:
        db = get_database()
        
        # Create portfolio item
        portfolio_item = Portfolio(**portfolio_data.dict())
        
        # Save to database
        await db.portfolio.insert_one(portfolio_item.dict())
        
        return StandardResponse(
            success=True,
            message="Portfolio item created successfully",
            data={"id": portfolio_item.id}
        )
        
    except Exception as e:
        logger.error(f"Error creating portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Failed to create portfolio item")

@api_router.get("/portfolio", response_model=List[Portfolio])
async def get_portfolio_items(
    service_type: Optional[ServiceType] = None,
    is_featured: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=50)
):
    """Get portfolio items"""
    try:
        db = get_database()
        
        # Build query
        query = {}
        if service_type:
            query["service_type"] = service_type
        if is_featured is not None:
            query["is_featured"] = is_featured
        
        # Get portfolio items
        cursor = db.portfolio.find(query).skip(skip).limit(limit).sort("created_at", -1)
        portfolio_items = await cursor.to_list(length=limit)
        
        return [Portfolio(**item) for item in portfolio_items]
        
    except Exception as e:
        logger.error(f"Error getting portfolio items: {e}")
        raise HTTPException(status_code=500, detail="Failed to get portfolio items")

@api_router.put("/portfolio/{portfolio_id}", response_model=StandardResponse)
async def update_portfolio_item(
    portfolio_id: str,
    update_data: PortfolioUpdate
):
    """Update portfolio item"""
    try:
        db = get_database()
        
        # Update portfolio item
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        update_dict["updated_at"] = datetime.utcnow()
        
        result = await db.portfolio.update_one(
            {"id": portfolio_id},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Portfolio item not found")
        
        return StandardResponse(
            success=True,
            message="Portfolio item updated successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Failed to update portfolio item")

# Services Endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services(
    category: Optional[ServiceType] = None,
    is_active: Optional[bool] = True
):
    """Get services"""
    try:
        db = get_database()
        
        # Build query
        query = {}
        if category:
            query["category"] = category
        if is_active is not None:
            query["is_active"] = is_active
        
        # Get services
        cursor = db.services.find(query).sort("created_at", -1)
        services = await cursor.to_list(length=100)
        
        return [Service(**service) for service in services]
        
    except Exception as e:
        logger.error(f"Error getting services: {e}")
        raise HTTPException(status_code=500, detail="Failed to get services")

@api_router.post("/services", response_model=StandardResponse)
async def create_service(
    service_data: ServiceCreate
):
    """Create a new service"""
    try:
        db = get_database()
        
        # Create service
        service = Service(**service_data.dict())
        
        # Save to database
        await db.services.insert_one(service.dict())
        
        return StandardResponse(
            success=True,
            message="Service created successfully",
            data={"id": service.id}
        )
        
    except Exception as e:
        logger.error(f"Error creating service: {e}")
        raise HTTPException(status_code=500, detail="Failed to create service")

# Booking Endpoints
@api_router.post("/bookings", response_model=StandardResponse)
async def create_booking(
    booking_data: BookingCreate,
    background_tasks: BackgroundTasks,
    user_id: Optional[str] = None
):
    """Create a new booking"""
    try:
        db = get_database()
        
        # Create booking
        booking = Booking(
            user_id=user_id or str(uuid.uuid4()),
            **booking_data.dict()
        )
        
        # Save to database
        await db.bookings.insert_one(booking.dict())
        
        # Send confirmation email in background
        if user_id:
            user = await db.users.find_one({"id": user_id})
            if user:
                background_tasks.add_task(
                    email_service.send_booking_confirmation,
                    booking.dict(),
                    user["email"]
                )
        
        # Track analytics
        await db.analytics.update_one(
            {"analytics_date": date.today().isoformat()},
            {"$inc": {"bookings": 1}},
            upsert=True
        )
        
        return StandardResponse(
            success=True,
            message="Booking created successfully",
            data={"id": booking.id}
        )
        
    except Exception as e:
        logger.error(f"Error creating booking: {e}")
        raise HTTPException(status_code=500, detail="Failed to create booking")

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(
    user_id: Optional[str] = None,
    status: Optional[BookingStatus] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100)
):
    """Get bookings"""
    try:
        db = get_database()
        
        # Build query
        query = {}
        if user_id:
            query["user_id"] = user_id
        if status:
            query["status"] = status
        
        # Get bookings
        cursor = db.bookings.find(query).skip(skip).limit(limit).sort("created_at", -1)
        bookings = await cursor.to_list(length=limit)
        
        return [Booking(**booking) for booking in bookings]
        
    except Exception as e:
        logger.error(f"Error getting bookings: {e}")
        raise HTTPException(status_code=500, detail="Failed to get bookings")

# Testimonials Endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(
    is_featured: Optional[bool] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=50)
):
    """Get testimonials"""
    try:
        db = get_database()
        
        # Build query
        query = {}
        if is_featured is not None:
            query["is_featured"] = is_featured
        
        # Get testimonials
        cursor = db.testimonials.find(query).skip(skip).limit(limit).sort("rating", -1)
        testimonials = await cursor.to_list(length=limit)
        
        return [Testimonial(**testimonial) for testimonial in testimonials]
        
    except Exception as e:
        logger.error(f"Error getting testimonials: {e}")
        raise HTTPException(status_code=500, detail="Failed to get testimonials")

@api_router.post("/testimonials", response_model=StandardResponse)
async def create_testimonial(
    testimonial_data: TestimonialCreate
):
    """Create a new testimonial"""
    try:
        db = get_database()
        
        # Create testimonial
        testimonial = Testimonial(**testimonial_data.dict())
        
        # Save to database
        await db.testimonials.insert_one(testimonial.dict())
        
        return StandardResponse(
            success=True,
            message="Testimonial created successfully",
            data={"id": testimonial.id}
        )
        
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Failed to create testimonial")

# Analytics Endpoints
@api_router.get("/analytics/summary")
async def get_analytics_summary():
    """Get analytics summary"""
    try:
        db = get_database()
        
        # Get today's analytics
        today = date.today().isoformat()
        today_analytics = await db.analytics.find_one({"analytics_date": today})
        
        # Get total counts
        total_contacts = await db.contact_forms.count_documents({})
        total_bookings = await db.bookings.count_documents({})
        total_chat_sessions = await db.chat_sessions.count_documents({})
        total_portfolio = await db.portfolio.count_documents({})
        
        # Get recent activity
        recent_contacts = await db.contact_forms.count_documents({
            "created_at": {"$gte": datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)}
        })
        
        summary = {
            "today": {
                "page_views": today_analytics.get("page_views", 0) if today_analytics else 0,
                "contact_forms": today_analytics.get("contact_forms", 0) if today_analytics else 0,
                "bookings": today_analytics.get("bookings", 0) if today_analytics else 0,
                "chat_sessions": today_analytics.get("chat_sessions", 0) if today_analytics else 0,
            },
            "total": {
                "contacts": total_contacts,
                "bookings": total_bookings,
                "chat_sessions": total_chat_sessions,
                "portfolio_items": total_portfolio,
            },
            "recent": {
                "contacts_today": recent_contacts,
            }
        }
        
        return StandardResponse(
            success=True,
            message="Analytics summary retrieved successfully",
            data=summary
        )
        
    except Exception as e:
        logger.error(f"Error getting analytics summary: {e}")
        raise HTTPException(status_code=500, detail="Failed to get analytics summary")

# Include the API router
app.include_router(api_router)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    await connect_to_db()
    logger.info("NOWHERE Digital API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    await close_db_connection()
    logger.info("NOWHERE Digital API shutdown")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "NOWHERE Digital API",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "health": "/api/health",
            "docs": "/docs",
            "redoc": "/redoc"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
