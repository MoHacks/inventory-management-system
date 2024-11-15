from fastapi import FastAPI, Depends, status, APIRouter, Query
from ..db import SessionLocal
from ..controllers.client import get_products, get_users, get_transactions, get_geography
from ..schemas import LoginModel, RegisterModel 
from ..db import get_db
from sqlalchemy.orm import Session

router = APIRouter(tags=['Client'])

@router.get("/inventory", status_code=status.HTTP_200_OK)
async def get_products_route(db: Session = Depends(get_db),
                            ):
    # print("within the router inventory...")
    return await get_products(db)


@router.get("/customers", status_code=status.HTTP_200_OK)
async def get_customers_route(db: Session = Depends(get_db),
                            page: int = Query(1),
                            pageSize: int = Query(20),
                            sort: str = None,
                            search: str = ""):
    return await get_users(db, page, pageSize, sort, search)


@router.get("/transactions", status_code=status.HTTP_200_OK)
async def get_transactions_route(db: Session = Depends(get_db),
                                page: int = Query(1),
                                pageSize: int = Query(20),
                                sort: str = None,
                                search: str = ""):
    return await get_transactions(db, page, pageSize, sort, search)


@router.get("/geography", status_code=status.HTTP_200_OK)
async def get_geography_route(db: Session = Depends(get_db)):
    return await get_geography(db)