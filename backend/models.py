from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, date
from enum import Enum
import uuid

# Enums for various status fields
class ContactStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CONVERTED = "converted"
    CLOSED = "closed"

class ServiceType(str, Enum):
    SOCIAL_MEDIA = "social_media"
    WHATSAPP = "whatsapp"
    WEB_DEVELOPMENT = "web_development"
    AI_SOLUTIONS = "ai_solutions"
    SEO = "seo"
    CONTENT_MARKETING = "content_marketing"
    ECOMMERCE = "ecommerce"
    LEAD_GENERATION = "lead_generation"
    OTHER = "other"

class ProjectStatus(str, Enum):
    PLANNING = "planning"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    COMPLETED = "completed"
    ON_HOLD = "on_hold"
    CANCELLED = "cancelled"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"

class UserRole(str, Enum):
    ADMIN = "admin"
    CLIENT = "client"
    STAFF = "staff"

# Base Models
class BaseDocument(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Contact Form Models
class ContactForm(BaseDocument):
    name: str
    email: EmailStr
    phone: str
    service: ServiceType
    message: str
    status: ContactStatus = ContactStatus.NEW
    assigned_to: Optional[str] = None
    notes: List[str] = []

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: ServiceType
    message: str

class ContactFormUpdate(BaseModel):
    status: Optional[ContactStatus] = None
    assigned_to: Optional[str] = None
    notes: Optional[List[str]] = None

# User Models
class User(BaseDocument):
    email: EmailStr
    password_hash: str
    full_name: str
    role: UserRole = UserRole.CLIENT
    is_active: bool = True
    company: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: UserRole = UserRole.CLIENT
    company: Optional[str] = None
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool
    company: Optional[str]
    phone: Optional[str]
    created_at: datetime

# Portfolio/Case Study Models
class Portfolio(BaseDocument):
    title: str
    description: str
    client_name: str
    service_type: ServiceType
    project_duration: str
    results: List[str]
    images: List[str]  # Base64 encoded images
    technologies: List[str]
    testimonial: Optional[str] = None
    is_featured: bool = False

class PortfolioCreate(BaseModel):
    title: str
    description: str
    client_name: str
    service_type: ServiceType
    project_duration: str
    results: List[str]
    images: List[str]
    technologies: List[str]
    testimonial: Optional[str] = None
    is_featured: bool = False

class PortfolioUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    client_name: Optional[str] = None
    service_type: Optional[ServiceType] = None
    project_duration: Optional[str] = None
    results: Optional[List[str]] = None
    images: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    testimonial: Optional[str] = None
    is_featured: Optional[bool] = None

# Booking Models
class Booking(BaseDocument):
    user_id: str
    service_type: ServiceType
    preferred_date: date
    preferred_time: str
    duration: int  # in minutes
    description: str
    status: BookingStatus = BookingStatus.PENDING
    confirmed_date: Optional[datetime] = None
    meeting_link: Optional[str] = None
    notes: Optional[str] = None

class BookingCreate(BaseModel):
    service_type: ServiceType
    preferred_date: date
    preferred_time: str
    duration: int = 60
    description: str

class BookingUpdate(BaseModel):
    status: Optional[BookingStatus] = None
    confirmed_date: Optional[datetime] = None
    meeting_link: Optional[str] = None
    notes: Optional[str] = None

# AI Chat Models
class ChatMessage(BaseDocument):
    session_id: str
    user_id: Optional[str] = None
    message: str
    response: str
    is_from_user: bool = True
    metadata: Dict[str, Any] = {}

class ChatMessageCreate(BaseModel):
    session_id: str
    message: str
    user_id: Optional[str] = None

class ChatSession(BaseDocument):
    session_id: str
    user_id: Optional[str] = None
    title: str = "Chat Session"
    is_active: bool = True
    total_messages: int = 0

# Content Generation Models
class ContentGeneration(BaseDocument):
    user_id: Optional[str] = None
    content_type: str  # blog, social_media, ad_copy, etc.
    prompt: str
    generated_content: str
    is_approved: bool = False
    metadata: Dict[str, Any] = {}

class ContentGenerationCreate(BaseModel):
    content_type: str
    prompt: str
    user_id: Optional[str] = None

# Service Models (for dynamic service management)
class Service(BaseDocument):
    title: str
    description: str
    icon: str
    features: List[str]
    price_range: Optional[str] = None
    is_active: bool = True
    category: ServiceType

class ServiceCreate(BaseModel):
    title: str
    description: str
    icon: str
    features: List[str]
    price_range: Optional[str] = None
    category: ServiceType

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    features: Optional[List[str]] = None
    price_range: Optional[str] = None
    is_active: Optional[bool] = None
    category: Optional[ServiceType] = None

# Testimonial Models
class Testimonial(BaseDocument):
    name: str
    company: str
    position: Optional[str] = None
    text: str
    rating: int = Field(ge=1, le=5)
    image: Optional[str] = None  # Base64 encoded image
    is_featured: bool = False

class TestimonialCreate(BaseModel):
    name: str
    company: str
    position: Optional[str] = None
    text: str
    rating: int = Field(ge=1, le=5)
    image: Optional[str] = None
    is_featured: bool = False

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    image: Optional[str] = None
    is_featured: Optional[bool] = None

# Analytics Models
class Analytics(BaseDocument):
    page_views: int = 0
    unique_visitors: int = 0
    contact_forms: int = 0
    bookings: int = 0
    chat_sessions: int = 0
    analytics_date: str = Field(default_factory=lambda: date.today().isoformat())

# Email Templates
class EmailTemplate(BaseDocument):
    name: str
    subject: str
    body: str
    template_type: str  # contact_confirmation, booking_confirmation, etc.
    variables: List[str] = []  # Available variables for the template

# Response Models
class StandardResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    per_page: int
    has_next: bool
    has_prev: bool