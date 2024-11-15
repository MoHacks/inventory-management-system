from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, client, general, management, sales, users
from .db import engine, get_db
from .models import models
from sqlalchemy.orm import Session
from sqlalchemy import text

app = FastAPI()

# Define the origins you want to allow, I am allowing local hosts and from render
origins = [
    "https://inventory-management-system-1-cenc.onrender.com",
    # Add other domains or origins as necessary
]

# To allow for CORS to allow different domains to access the API, must include the following middleware:
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("passed main..")

# Include the routes

# the prefix is attached to each route
app.include_router(auth.router, prefix='/auth')
app.include_router(client.router, prefix='/client')
app.include_router(general.router, prefix='/general')
app.include_router(management.router, prefix='/management')
app.include_router(sales.router, prefix='/sales')
app.include_router(users.router, prefix='/users')

# generate tables using SQLalchemy provided with the database models 
models.Base.metadata.create_all(bind=engine)

# fetches the root of the project directory 
@app.get("/")
def read_root():
    return {"Message " : "Welcome to Iventory Managemenet System Main API Endpoint!"}

