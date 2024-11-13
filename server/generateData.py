from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from faker import Faker
import random

# Assuming you have set up your database URL in a config file
from server.db import Base, POSTGRES_URL  # Update with your actual import

# Import your User model
from server.models.models import User, Transaction, AffiliateStats, Product  # Adjust the import according to your structure

# Set up the database engine and session
engine = create_engine(POSTGRES_URL)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Initialize Faker
fake = Faker()

# Generate 50 random users
# for _ in range(50):
#     user = User(
#         id=fake.uuid4(),
#         firstName=fake.first_name(),
#         lastName=fake.last_name(),
#         email=fake.unique.email(),
#         password=fake.password(),
#         location=fake.city(),
#         occupation=fake.job()
#     )
#     session.add(user)


# Generate 50 random products
# for _ in range(50):
#     product = Product(
#         id=fake.uuid4(),
#         name=fake.word(),
#         price=round(random.uniform(5.0, 100.0), 2),  # Random price between $5 and $100
#         description=fake.sentence(),
#         category=fake.word(),
#         rating=round(random.uniform(1.0, 5.0), 1),  # Random rating between 1 and 5
#         supply=random.randint(0, 100)  # Random supply count between 0 and 100
#     )
#     session.add(product)


# Fetch all product IDs from the Product table
# product_ids = [product.id for product in session.query(Product).all()]

# Generate 50 random transactions
# for _ in range(50):
#     # Randomly select a userId (or None)
#     user_id = random.choice([None] + [user.id for user in session.query(User).all()])
    
#     # Randomly select 1-5 product IDs from the list of available products
#     selected_products = random.sample(product_ids, random.randint(1, 5))

#     transaction = Transaction(
#         id=fake.uuid4(),
#         userId=user_id,
#         cost=round(random.uniform(10.0, 500.0), 2),  # Random cost between $10 and $500
#         products=selected_products  # List of product IDs
#     )
#     session.add(transaction)


# Generate 50 random affiliate stats
# for _ in range(50):
#     user_id = random.choice([None] + [user.id for user in session.query(User).all()])  # Random userId or None
#     affiliate_stats = AffiliateStats(
#         id=fake.uuid4(),
#         userId=user_id,
#         # affiliateSales=[fake.word() for _ in range(random.randint(1, 10))]  # Random list of sales
#     )
#     session.add(affiliate_stats)


# Commit the session
session.commit()
print("50 random users added to the database.")

# Close the session
session.close()
