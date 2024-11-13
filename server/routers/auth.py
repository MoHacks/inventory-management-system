from fastapi import FastAPI, Depends, status, APIRouter
from ..db import SessionLocal
from ..controllers.authentication import register, login
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..models import models 

# The tags=['Authentication'] is used to categorize the routes that will be added to this router under 
# the "Authentication" tag in the OpenAPI documentation (which FastAPI automatically generates)
router = APIRouter(tags=['Authentication'])

# Define routes
@router.post("/register", status_code=status.HTTP_200_OK)
async def register_route(registration_data: RegisterModel, db: Session = Depends(get_db)):
    return await register(registration_data, db)

# login_data is of type Pydantic (LoginModel) with fields email (EmailStr), and password (str) 
@router.post("/login", status_code=status.HTTP_200_OK)
async def login_route(login_data: LoginModel, db: Session = Depends(get_db)):
    return await login(login_data, db)

# To run the FastAPI server, use: `uvicorn main:app --reload`