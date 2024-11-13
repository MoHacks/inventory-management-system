from fastapi import FastAPI, Depends, status, HTTPException
# from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import oauth2
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import models
from .. import schemas, utils
from ..models.models import User

# print("Loading authentication module...")
# def client():
#     print("Client function is called")
async def register(register_data: schemas.RegisterModel = Depends(), db: Session = Depends(get_db)):

    # NOTE: CHANGE THIS TO User instead of models.User
    email = db.query(models.User).filter(models.User.email  == register_data.email).first()

    # print("attempting to register user with email: ", register_data.email)
    # if email is not used before, then we can use to register new user
    # add users credentials into the database (email, password, firstName, lastName, location, occupation) 
    if email is None:
        hashed_password = utils.hash(register_data.password)
        
        # Create the user using the User Model
        new_user = User(
            first_name = register_data.firstName,
            last_name = register_data.lastName,
            email = register_data.email,
            password = hashed_password,
            location = register_data.location,
            occupation = register_data.occupation
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return {"id": new_user.id, "email": new_user.email, "first_name": new_user.first_name, "last_name": new_user.last_name}

    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Email already Used!")

# OAuth2PasswordRequestForm returns two fields {username: "...", password: "..." }
# You can theoretically replace it with a Pydantic model (schemas.LoginModel) and nothing would change
# besides replacing username and password with the respective LoginModel fields (email and password)
async def login(login_data: schemas.LoginModel, db: Session = Depends(get_db)):
    
    try:
        # print("db object: ", db)
        # print("models.User: ", models.User)
        # print("login_data.email: ", login_data.email)

        # ERROR IS BEING CAUSED HERE
        user = db.query(models.User).filter(models.User.email == login_data.email).first()
        # print("Queried user: ", user) 
        if not user or not utils.verify(login_data.password, user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid Credentials")

        # print("user: ", user)
        access_token = oauth2.create_access_token(data={"first_name": user.first_name, "user_id": user.id, "email": login_data.email})
        return {"access_token": access_token, "token_type": "bearer"}

    except Exception as e:
        # print("You didn't actually make it. Error: ", e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))