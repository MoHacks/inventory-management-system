from re import A
from fastapi import FastAPI, Depends, status, HTTPException
# from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import oauth2
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import models
from .. import schemas, utils
from ..models.models import OverallStats



async def get_sales_info(db: Session = Depends(get_db)):

    try:
        overallStats = db.query(OverallStats).first()
        # print("sales overallStats: ", overallStats)
        result = {
            "totalCustomers": overallStats.total_customers,
            "yearlySalesTotal": overallStats.yearly_sales_total,
            "yearlyTotalSoldUnits": overallStats.yearly_total_sold_units,
            "monthlyData": overallStats.monthly_data,
            "dailyData": overallStats.daily_data,
            "salesByCategory": overallStats.sales_by_category
        }


        # print("result: ", result)
        return result

    except Exception as e:
        # print("Error in Sales: ", e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))