# db config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv('./server/.env')


# Access the POSTGRES_URL from the environment
POSTGRES_URL = os.getenv("POSTGRES_URL")

# print("POSTGRES_URLLLLLLLLLLLLLLLLLLLLL: ", POSTGRES_URL)

engine = create_engine(POSTGRES_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    
    # Create a new database session
    db = SessionLocal()
    try:
        # Provide the session to the caller
        yield db
        
    # Ensure the session is closed when done
    finally:
        db.close()
