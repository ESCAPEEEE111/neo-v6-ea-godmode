from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    mongo_url: str = os.getenv("MONGO_URL", "mongodb://localhost:27017")
    db_name: str = os.getenv("DB_NAME", "nowhere_digital")
    
    # Email Settings
    sendgrid_api_key: str = os.getenv("SENDGRID_API_KEY", "")
    sender_email: str = os.getenv("SENDER_EMAIL", "hello@nowheredigital.ae")
    admin_email: str = os.getenv("ADMIN_EMAIL", "admin@nowheredigital.ae")
    
    # AI Settings
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    default_ai_model: str = os.getenv("DEFAULT_AI_MODEL", "gpt-4o")
    ai_provider: str = os.getenv("AI_PROVIDER", "openai")
    
    # Security
    jwt_secret: str = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 24 * 60 * 60  # 24 hours
    
    # CORS
    cors_origins: List[str] = [
        "http://localhost:3000",
        "https://162f088c-f246-46ad-b513-aa107bcc1909.preview.emergentagent.com"
    ]
    
    # API Settings
    api_prefix: str = "/api"
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # File Upload
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    allowed_file_types: List[str] = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
    
    # Rate Limiting
    rate_limit_requests: int = 100
    rate_limit_period: int = 60  # seconds
    
    # Email Templates
    email_templates_dir: str = "email_templates"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Create global settings instance
settings = Settings()