from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    clerk_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scan_type = Column(String, index=True) # "url", "phishing", "vulnerability"
    target = Column(String) # URL or text snippet
    result_score = Column(Integer) # 0-100 score
    result_data = Column(Text) # JSON string of full results
    created_at = Column(DateTime(timezone=True), server_default=func.now())
