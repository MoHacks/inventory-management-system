import json
import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from server.models.models import User, Product, AffiliateStats, Transaction, ProductStat, OverallStats  # defined SQLAlchemy models
from datetime import datetime
# Create a connection to the database
# Load environment variables from .env file
load_dotenv()

# Access the POSTGRES_URL from the environment
POSTGRES_URL = os.getenv("POSTGRES_URL")
engine = create_engine(POSTGRES_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Load data from JSON files
# with open('server/dataUserTest.json') as f:
#     user_test_data = json.load(f)

# with open('server/dataProduct.json') as f:
#     products_data = json.load(f)

# with open('server/dataTransaction.json') as f:
#     user_transaction_data = json.load(f)

# with open('server/dataAffiliateStat.json') as f:
    # user_affilliate_stat = json.load(f)

# with open('server/dataProductStat.json') as f:
#     data_product_stat = json.load(f)

with open('server/dataOverallStat.json') as f:
      data_overall_stats = json.load(f)

# Insert User data
# for user in user_test_data:
#     new_user = User(**user)
#     session.add(new_user)

# Insert Product data
# for product in products_data:
#     # Rename `_id` to `id` if `_id` exists
#     if '_id' in product:
#         product['id'] = product.pop('_id')  # Change `_id` to `id`
#     new_product = Product(**product)
#     session.add(new_product)

# Transaction
# for transaction in user_transaction_data:
#     if '_id' in transaction:
#         transaction['id'] = transaction.pop('_id')  # Change `_id` to `id`
#     new_transaction = Transaction(**transaction)
#     session.add(new_transaction)

# AffiliateStats
# for affStat in user_affilliate_stat:
#     if '_id' in affStat:
#         affStat['id'] = affStat.pop('_id')  # Change `_id` to `id`
#     new_affiliate_stat = AffiliateStats(**affStat)
#     session.add(new_affiliate_stat)

# NOTE: This is a much cleaner way of inserting data into postgres than the method above
# for data in data_product_stat:
#     product_stat = ProductStat(
#         id=data['_id'],
#         product_id=data['productId'],
#         yearly_sales_total=data['yearlySalesTotal'],
#         yearly_total_sold_units=data['yearlyTotalSoldUnits'],
#         monthly_data=data['monthlyData'],  # Directly assigning as SQLAlchemy will handle JSON conversion
#         daily_data=data['dailyData']       # Directly assigning as SQLAlchemy will handle JSON conversion
#     )
#     # Add the product_stat to the session
#     session.add(product_stat)

for data in data_overall_stats:
    overall_stats = OverallStats(
        id=data['_id'],
        yearly_sales_total=data['yearlySalesTotal'],
        yearly_total_sold_units=data['yearlyTotalSoldUnits'],
        monthly_data=data['monthlyData'],  # Directly assigning as SQLAlchemy will handle JSON conversion
        daily_data=data['dailyData'],       # Directly assigning as SQLAlchemy will handle JSON conversion
        year=data['year'],  
        total_customers=data['totalCustomers'],
        sales_by_category=data['salesByCategory'],  # JSONB field for sales by category
        created_at=datetime.fromisoformat(data['createdAt'].replace("Z", "")),  # Convert ISO 8601 to datetime
        updated_at=datetime.fromisoformat(data['updatedAt'].replace("Z", ""))   # Convert ISO 8601 to datetime
    )
    # Add the product_stat to the session
    session.add(overall_stats)
# Commit the session to save the data to the database
session.commit()

print("Data inserted successfully.")
