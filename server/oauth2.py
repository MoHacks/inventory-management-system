import jwt
# print("jwt.__file__: ", jwt.__file__)
from fastapi import Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordBearer
from . import schemas, db
from .models.models import User
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the POSTGRES_URL from the environment
POSTGRES_URL = os.getenv("POSTGRES_URL")


JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
# print("ACCESS_TOKEN_EXPIRE_MINUTES: ", type("ACCESS_TOKEN_EXPIRE_MINUTES"))
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # login endpoint will be used as tokenUrl

# Creates the access token (the data passed into create_access_token is the payload that is passsed in jwt)
def create_access_token(data: dict):
    # encoded data
    to_encode = data.copy()
    
    now = datetime.utcnow()

    # token expiration time
    expire = now + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    
    # add expiration to the dictionary data, which will then be added to the jwt payload
    to_encode.update({"expiration": expire.timestamp()})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt


# Verifies if the jwt token is valid with the JWT Secret key in your environment
def verify_access_token(token: str, credentials_exception):

    try:
        # print("Verifying access token...")
        # decode jwt
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        # extract id
        id: str = payload.get("user_id")
        if id is None:
            raise credentials_exception
        # valid with the schema the token id with the id of the user
        token_data = schemas.TokenData(id=id)

    except jwt.ExpiredSignatureError:
        raise credentials_exception

    # print("Token has expired")
    
    except jwt.InvalidTokenError:
        raise credentials_exception 

    return token_data

# returns the User object if valid token is provided
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(db.get_db)):

    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                          detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    token = verify_access_token(token, credentials_exception)
    # print("token: ", token)
    user = db.query(User).filter(User.id == token.id).first()

    return user
