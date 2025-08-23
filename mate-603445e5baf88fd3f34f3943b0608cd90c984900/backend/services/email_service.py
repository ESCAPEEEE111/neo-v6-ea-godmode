from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from config import settings
import logging
from typing import Optional, Dict, Any
import os

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.sg = SendGridAPIClient(api_key=settings.sendgrid_api_key) if settings.sendgrid_api_key else None
        self.sender_email = settings.sender_email
        self.admin_email = settings.admin_email

    async def send_email(self, to_email: str, subject: str, content: str, content_type: str = "text/html") -> bool:
        """Send email using SendGrid"""
        if not self.sg:
            logger.warning("SendGrid not configured, email not sent")
            return False
            
        try:
            from_email = Email(self.sender_email)
            to_email = To(to_email)
            content = Content(content_type, content)
            
            mail = Mail(from_email, to_email, subject, content)
            
            response = self.sg.send(mail)
            
            if response.status_code in [200, 201, 202]:
                logger.info(f"Email sent successfully to {to_email}")
                return True
            else:
                logger.error(f"Failed to send email. Status code: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return False

    async def send_contact_form_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Send notification email for new contact form submission"""
        subject = f"New Contact Form Submission - {contact_data['name']}"
        
        content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #00ff00; text-align: center; font-family: monospace;">
                        NEW CONTACT FORM SUBMISSION
                    </h2>
                    
                    <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 15px;">Contact Details:</h3>
                        <p><strong>Name:</strong> {contact_data['name']}</p>
                        <p><strong>Email:</strong> {contact_data['email']}</p>
                        <p><strong>Phone:</strong> {contact_data['phone']}</p>
                        <p><strong>Service:</strong> {contact_data['service']}</p>
                    </div>
                    
                    <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
                        <p style="background: white; padding: 15px; border-left: 4px solid #00ff00; margin: 0;">
                            {contact_data['message']}
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #666; font-size: 14px;">
                            Submitted at: {contact_data.get('created_at', 'N/A')}
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        return await self.send_email(self.admin_email, subject, content)

    async def send_contact_confirmation(self, contact_data: Dict[str, Any]) -> bool:
        """Send confirmation email to user who submitted contact form"""
        subject = "Thank you for contacting NOWHERE Digital - We'll be in touch!"
        
        content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #000; color: #00ff00;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #00ff00; font-family: monospace; font-size: 28px;">
                            NOWHERE DIGITAL
                        </h1>
                        <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                            DIGITAL_MATRIX_DUBAI
                        </p>
                    </div>
                    
                    <div style="background: #111; padding: 20px; border: 1px solid #00ff00; border-radius: 8px;">
                        <h2 style="color: #00ff00; font-family: monospace; margin-bottom: 20px;">
                            &gt; TRANSMISSION_RECEIVED
                        </h2>
                        
                        <p style="color: #00ff00; font-family: monospace; margin-bottom: 15px;">
                            Hello {contact_data['name']},
                        </p>
                        
                        <p style="color: #00ff00; font-family: monospace; margin-bottom: 15px;">
                            &gt; Your message has been received and processed
                            <br />
                            &gt; Agent will initiate contact within 24 hours
                            <br />
                            &gt; Service requested: {contact_data['service'].replace('_', ' ').title()}
                        </p>
                        
                        <div style="background: #000; padding: 15px; border-left: 3px solid #00ff00; margin: 20px 0;">
                            <h3 style="color: #00ff00; font-family: monospace; margin-bottom: 10px;">
                                YOUR_MESSAGE:
                            </h3>
                            <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                                {contact_data['message']}
                            </p>
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                                &gt; CONTACT_PROTOCOLS_ACTIVE
                                <br />
                                &gt; EMAIL: {self.sender_email}
                                <br />
                                &gt; PHONE: +971 50 XXX XXXX
                                <br />
                                &gt; LOCATION: Dubai, UAE
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #666; font-family: monospace; font-size: 12px;">
                            © 2025 NOWHERE_DIGITAL_MATRIX. ALL_RIGHTS_RESERVED.
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        return await self.send_email(contact_data['email'], subject, content)

    async def send_booking_confirmation(self, booking_data: Dict[str, Any], user_email: str) -> bool:
        """Send booking confirmation email"""
        subject = f"Booking Confirmation - {booking_data['service_type'].replace('_', ' ').title()}"
        
        content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #000; color: #00ff00;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #00ff00; font-family: monospace; font-size: 28px;">
                            NOWHERE DIGITAL
                        </h1>
                        <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                            BOOKING_CONFIRMED
                        </p>
                    </div>
                    
                    <div style="background: #111; padding: 20px; border: 1px solid #00ff00; border-radius: 8px;">
                        <h2 style="color: #00ff00; font-family: monospace; margin-bottom: 20px;">
                            &gt; APPOINTMENT_SCHEDULED
                        </h2>
                        
                        <div style="background: #000; padding: 15px; border-left: 3px solid #00ff00; margin: 20px 0;">
                            <h3 style="color: #00ff00; font-family: monospace; margin-bottom: 10px;">
                                BOOKING_DETAILS:
                            </h3>
                            <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                                &gt; SERVICE: {booking_data['service_type'].replace('_', ' ').title()}
                                <br />
                                &gt; DATE: {booking_data['preferred_date']}
                                <br />
                                &gt; TIME: {booking_data['preferred_time']}
                                <br />
                                &gt; DURATION: {booking_data['duration']} minutes
                                <br />
                                &gt; STATUS: {booking_data['status'].title()}
                            </p>
                        </div>
                        
                        {f'<p style="color: #00ff00; font-family: monospace; margin-bottom: 15px;">&gt; MEETING_LINK: {booking_data["meeting_link"]}</p>' if booking_data.get('meeting_link') else ''}
                        
                        <div style="margin-top: 30px;">
                            <p style="color: #00ff00; font-family: monospace; font-size: 14px;">
                                &gt; CONTACT_FOR_CHANGES: {self.sender_email}
                                <br />
                                &gt; EMERGENCY_CONTACT: +971 50 XXX XXXX
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        """
        
        return await self.send_email(user_email, subject, content)

    async def send_ai_content_email(self, user_email: str, content_type: str, generated_content: str) -> bool:
        """Send AI generated content via email"""
        subject = f"Your AI Generated {content_type.replace('_', ' ').title()} Content"
        
        content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #00ff00; text-align: center; font-family: monospace;">
                        AI GENERATED CONTENT
                    </h2>
                    
                    <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 15px;">Content Type: {content_type.replace('_', ' ').title()}</h3>
                        <div style="background: white; padding: 15px; border-left: 4px solid #00ff00; margin: 0;">
                            {generated_content}
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #666; font-size: 14px;">
                            Generated by NOWHERE Digital AI System
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        return await self.send_email(user_email, subject, content)

# Create global email service instance
email_service = EmailService()