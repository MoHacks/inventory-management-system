from sqlalchemy import create_engine, inspect

engine = create_engine('postgresql://postgres:postgres@localhost:5432/inventory')
inspector = inspect(engine)

# Check foreign keys in the transactions table
# print(inspector.get_foreign_keys('transactions'))