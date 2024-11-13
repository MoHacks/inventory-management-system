from fastapi import Depends, FastAPI, HTTPException, Query, status
from sqlalchemy import asc, desc, or_, and_, cast, String
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from .. import oauth2, schemas, utils
from ..db import get_db
from ..models import models
from ..models.models import Product, ProductStat, Transaction, User

async def get_products(db: Session = Depends(get_db),
                    search: str = ""):

    try:
        products = db.query(Product).all()

        # For every product, get its stats using its id
        product_with_stats = []
        for product in products:
            stats = db.query(ProductStat).filter(ProductStat.product_id == product.id).all()
            product_with_stats.append({
                **product.__dict__,
                'stat': stats
            })

        # print("product_with_stats: ", product_with_stats)
        return product_with_stats

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

async def get_users(db: Session = Depends(get_db),
                page: int = Query(0, ge=0),
                pageSize: int = Query(20, gt=0), 
                sort: str = None,
                search: str = ""):      

    try:
        # print("in  getting customers/users")
        # print("page: ", page)
        # print("pageSize: ", pageSize)
        # print("sort: ", sort)
        if sort == {}:
            # print("within sort")
            sort_parsed = eval(sort)  # Assume sort is passed as a dict-like string
            sort_column = sort_parsed.get("field")
            sort_order = asc(sort_column) if sort_parsed.get("sort") == "asc" else desc(sort_column)
        else:
            # print("without sort")
            sort_order = None
        
        page = max(page, 0)  # Ensure page is non-negative
        offset = page * pageSize
        # print(page, offset, pageSize)

        users_query = db.query(User).filter(
            and_(
                User.role == "user",
                or_(
                    User.first_name.ilike(f"%{search}%"),
                    User.last_name.ilike(f"%{search}%"),
                    User.email.ilike(f"%{search}%"),
                    User.occupation.ilike(f"%{search}%"),
                    User.country.ilike(f"%{search}%")
                )
            )
        )   

        # print("users_query: ", users_query)

        if sort_order:
            users_query = users_query.order_by(sort_order)
        
        # print("passed sort_order: ", sort_order)
        
        # Pagination
        users = users_query.offset(offset).limit(pageSize).all()

        # print("Fetched Users: ", [user.__dict__ for user in users])

        for user in users:
            user.name = user.first_name + " " + user.last_name
        
        # Total records count for search
        total = users_query.count()

        return {"users": users, "total": total}

    except Exception as e:
        # print("users could not be found: ", e)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
async def get_transactions(db: Session = Depends(get_db), 
                        page: int = Query(0, ge=0),
                        pageSize: int = Query(20, gt=0), 
                        sort: str = None,
                        search: str = ""):

    try:
        # print("sort: ", sort)
        if sort == {}:
            # print("within sort")
            sort_parsed = eval(sort)  # Assume sort is passed as a dict-like string
            sort_column = sort_parsed.get("field")
            sort_order = asc(sort_column) if sort_parsed.get("sort") == "asc" else desc(sort_column)
        else:
            # print("without sort")
            sort_order = None
        
        # page = max(page, 0)  # Ensure page is non-negative
        offset = page * pageSize
        # print(page, offset, pageSize)
        # print("PAGEEEEEEEEEEEEEEEEEEEEEE: ", page)
        # print("pageeeeeeeeeeeeeeeeeeSIZE: ", pageSize)
        # print("OFFFFFFFFFFFFFFFFFFFFSSET: ", offset)
        

        def isFloat(x):

            try:
                if float(x):
                    return True

            except:
                return False
                    

        transactions_query = db.query(Transaction).filter(
            or_(
                Transaction.id.ilike(f"%{search}%"),
                Transaction.user_id.ilike(f"%{search}%"),
                cast(Transaction.cost, String).ilike(f"%{search}%") if isFloat(search) else None
            )
        )#.limit(pageSize).offset(offset)

        # print("transactions_query: ", transactions_query)

        # Apply sorting if applicable
        if sort_order:
            transactions_query = transactions_query.order_by(sort_order)
        
        # print("passed sort_order: ", sort_order)
        
        # Pagination
        transactions = transactions_query.offset(offset).limit(pageSize).all()
        
        # print("transactions: ", transactions[0].__dict__)
        
        # print("Fetched transactions: ", [t.__dict__ for t in transactions])

        # Total records count for search
        total = transactions_query.count()
        # print("total: ", total)
        return {"transactions": transactions, "total": total}
    
    except Exception as e:
        # print("Could not find record of transaction query: ", e)
        # return {"transactions": {}, "total": 0}
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


import pycountry
from sqlalchemy.ext.asyncio import AsyncSession

def get_country_iso3(country_iso2):
    try:
        country = pycountry.countries.get(alpha_2=country_iso2)
        return country.alpha_3 if country else None
    except LookupError:
        return None

# Example
# iso3 = get_country_iso3('US')
# print(iso3)  # Outputs: 'USA'

async def get_geography(db: AsyncSession = Depends(get_db)):

    try:
        # print("WE ARE IN get_geography controller function!!!!")
        
        # Fetch all users asynchronously
        result = db.execute(select(User))

        # print("passed result: ", result)

        users = result.scalars().all()
        
        # print("passed users: ", users)
        
        # Map user locations by country and count occurrences
        mapped_locations = {}
        for user in users:
            country_iso3 = get_country_iso3(user.country)
            # print("country_iso3: ", country_iso3)
            if country_iso3 not in mapped_locations:
                mapped_locations[country_iso3] = 0
            mapped_locations[country_iso3] += 1

        # Format the locations into the desired structure
        formatted_locations = [{"id": country, "value": count} for country, count in mapped_locations.items()]

        return formatted_locations

    except Exception as e:
        # print("exception in get_geography: ", e)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))