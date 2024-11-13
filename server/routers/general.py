from fastapi import FastAPI, Depends, status, APIRouter
from ..db import SessionLocal
from ..controllers.general import get_user, get_dashboardstats
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session

router = APIRouter(tags=['General'])

# 
@router.get("/user/{id}", status_code=status.HTTP_200_OK)
async def get_user_route(id: str, db: Session = Depends(get_db)):
    return await get_user(id, db)

# 
@router.get("/dashboard", status_code=status.HTTP_200_OK)
async def get_dashboardstats_route(db: Session = Depends(get_db)):
    # print("We are in get_dashboardstats_route!")
    return await get_dashboardstats(db)
