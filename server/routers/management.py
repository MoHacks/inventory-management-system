from fastapi import FastAPI, Depends, status, APIRouter
from ..db import SessionLocal
from ..controllers.management import get_admins
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session

router = APIRouter(tags=['Management'])

@router.get("/admins", status_code=status.HTTP_200_OK)
async def get_admins_route(db: Session = Depends(get_db)):
    # print("We are in get_admins_route!")
    return await get_admins(db)
    