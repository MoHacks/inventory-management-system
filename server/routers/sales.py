from fastapi import FastAPI, Depends, status, APIRouter
from ..db import SessionLocal
# from ..controllers.sales import ....
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session
from ..controllers.sales import get_sales_info

router = APIRouter(tags=['Sales'])

@router.get("/sales", status_code=status.HTTP_200_OK)
async def get_dashboardstats_route(db: Session = Depends(get_db)):
    # print("We are in get_sales_info_route!")
    return await get_sales_info(db)