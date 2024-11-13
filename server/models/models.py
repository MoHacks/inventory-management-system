# app/models.py
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Table, DateTime, MetaData, JSON
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.types import DateTime
from datetime import datetime
import uuid
from ..db import Base
# from sqlalchemy.orm import configure_mappers
# configure_mappers()
# User Table
class User(Base):
    __tablename__ = 'users'
    
    # id = Column(Integer, primary_key=True, autoincrement=True) # auto-increments the id
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))  # Automatically generate a UUID
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    location = Column(String)
    occupation = Column(String)
    country = Column(String)
    role = Column(String, default="user")  # Ne column added
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())


    transactions = relationship("Transaction", back_populates="user")
    # NOTE: Not sure if I need this....
    # define relationship to affiliate_stats
    # affiliate_stats = relationship("AffiliateStats", back_populates="user") # Link back to AffiliateStats
    
    # NOTE: I DONT THINK I NEED THIS.....
    # user = relationship("User", back_populates="affiliate_stats")

# Transaction Table
class Transaction(Base):

    # NEEDS: id, affiliate_id?, cost, products ==> YOU DONT NEED userID or user
    __tablename__ = 'transactions'
    
    id = Column(String, primary_key=True)
    
    # affiliate_id = Column(String, ForeignKey('affiliate_stats.id'), nullable=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=True)
    cost = Column(Float, nullable=False)
    
    products = Column(ARRAY(String), nullable=False)
    # location = Column(String, nullable=True)  # This column is nullable by default
    created_at = Column(DateTime, default=datetime.utcnow(), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow(), nullable=True)

    # Relationships
    user = relationship("User", back_populates="transactions")
    # affiliate = relationship("AffiliateStats", back_populates="transactions")

# Product Table
class Product(Base):
    __tablename__ = 'products'
    
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String)
    category = Column(String)
    rating = Column(Float)
    supply = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

# ProductStat Table
class ProductStat(Base):
    __tablename__ = 'product_stats'
    
    id = Column(String, primary_key=True)
    product_id = Column(String, ForeignKey('products.id'), nullable=False)
    yearly_sales_total = Column(Float)
    yearly_total_sold_units = Column(Integer)
    monthly_data = Column(JSON)  # JSON for monthly stats
    daily_data = Column(JSON)    # JSON for daily stats
    
    product = relationship("Product")
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

# OverallStats Table
class OverallStats(Base):
    __tablename__ = 'overall_stats'
    
    id = Column(String, primary_key=True)
    total_customers = Column(Integer)
    yearly_sales_total = Column(Float)
    yearly_total_sold_units = Column(Integer)
    year = Column(Integer)
    monthly_data = Column(JSON)  # JSON for monthly stats
    daily_data = Column(JSON)    # JSON for daily stats
    sales_by_category = Column(JSONB)  # Map of category sales
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())