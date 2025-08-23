from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

db = Database()

async def connect_to_db():
    """Create database connection"""
    try:
        db.client = AsyncIOMotorClient(settings.mongo_url)
        db.db = db.client[settings.db_name]
        
        # Test connection
        await db.client.admin.command('ping')
        logger.info("Connected to MongoDB")
        
        # Create indexes
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

async def close_db_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        logger.info("Disconnected from MongoDB")

async def create_indexes():
    """Create database indexes for better performance"""
    try:
        # Contact forms indexes
        await db.db.contact_forms.create_index("email")
        await db.db.contact_forms.create_index("status")
        await db.db.contact_forms.create_index("created_at")
        
        # Users indexes
        await db.db.users.create_index("email", unique=True)
        await db.db.users.create_index("role")
        
        # Portfolio indexes
        await db.db.portfolio.create_index("service_type")
        await db.db.portfolio.create_index("is_featured")
        await db.db.portfolio.create_index("created_at")
        
        # Bookings indexes
        await db.db.bookings.create_index("user_id")
        await db.db.bookings.create_index("status")
        await db.db.bookings.create_index("preferred_date")
        
        # Chat messages indexes
        await db.db.chat_messages.create_index("session_id")
        await db.db.chat_messages.create_index("user_id")
        await db.db.chat_messages.create_index("created_at")
        
        # Chat sessions indexes
        await db.db.chat_sessions.create_index("session_id", unique=True)
        await db.db.chat_sessions.create_index("user_id")
        
        # Services indexes
        await db.db.services.create_index("category")
        await db.db.services.create_index("is_active")
        
        # Testimonials indexes
        await db.db.testimonials.create_index("is_featured")
        await db.db.testimonials.create_index("rating")
        
        # Analytics indexes
        await db.db.analytics.create_index("analytics_date", unique=True)
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Failed to create indexes: {e}")

def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return db.db