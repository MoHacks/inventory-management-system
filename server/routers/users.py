from fastapi import FastAPI, Depends, status, APIRouter
from ..db import SessionLocal
# from ..controllers.users import .....
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session

router = APIRouter(tags=['Users'])

# Query String to grab a particular user using its id
@router.get("/:id", status_code=status.HTTP_200_OK)
async def get_user_route(): # param1: 
    return await get_user(verifyToken, getUser) # token verification, 