from fastapi import FastAPI, Depends, status, HTTPException
# from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import oauth2
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import models
from .. import schemas, utils
from ..models.models import OverallStats, Transaction, User

# fetch user by its id
async def get_user(id: str, db: Session = Depends(get_db)):
    
    try:
        
        user = db.query(User).filter(User.id == id).first()
        # print("User: ", user)
        if not user:
            # print("user with id: ", id, "is not found within the database!")
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not Found")
        
        # print("user with id: ", id, "is found within the database!")
        return user
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


# fetch dashboard statistics -  Must have Transaction and OverallStat completed first!
async def get_dashboardstats(db: Session = Depends(get_db)):

    try:
        # print("Within try block of get_dashboardstats")
        currentMonth = "November"
        currentYear = 2021
        currentDay = "2021-11-15"

        # print("before Transactions!")
        # recent 50 transactions
        transactions = db.query(Transaction).all()#.order_by(Transaction.created_at.desc()).limit(50).all()
        # print("transactions: ", transactions)
        # print("before overallStats!")
        overallStats = db.query(OverallStats).filter(OverallStats.year == currentYear).first()

        # print("50 Transactions: ", transactions)
        # print("overallStats: ", overallStats)

        if not overallStats:
            # print("No overallStats")
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="overallStats not found!")

        # print("ACTUAL overallStats MONTHLY DATA: ", overallStats.monthly_data)
        this_month_stats = next(
            (data for data in overallStats.monthly_data if data['month'] == currentMonth), 
            "No data for this month"
        )
        # print("this_month_stats: ", this_month_stats)
        today_stats = next(
            (data for data in overallStats.daily_data if data['date'] == currentDay), 
            "No data for today"
        )
        # print("today_stats: ", today_stats)
        result = {
            "totalCustomers": overallStats.total_customers,
            "yearlySalesTotal": overallStats.yearly_sales_total,
            "yearlyTotalSoldUnits": overallStats.yearly_total_sold_units,
            "monthlyData": overallStats.monthly_data,
            "dailyData": overallStats.daily_data,
            "salesByCategory": overallStats.sales_by_category,
            "transactions": transactions,
            "thisMonthStats": this_month_stats,
            "todayStats": today_stats
        }

        # print("result: ", result)

        return result

    except Exception as e:
        # print("failed to grab transactions since we are in the Exception block")
        # print("db.query(Transaction).all():", db.query(Transaction).all())
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

