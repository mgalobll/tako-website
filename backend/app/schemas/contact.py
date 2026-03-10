from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactSubmissionCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=40)
    message: str = Field(min_length=10, max_length=2000)


class ContactSubmission(ContactSubmissionCreate):
    received_at: datetime
