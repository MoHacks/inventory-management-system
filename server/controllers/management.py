from fastapi import FastAPI, Depends, status, HTTPException
# from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import oauth2
from sqlalchemy import and_
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import models
from .. import schemas, utils
from ..models.models import User, Transaction

async def get_admins(db: Session = Depends(get_db)):
    try:
        # print("trying to get admins...")
        # Query for users with the 'admin' role and exclude the password field
        admins = db.query(User).filter(User.role == "admin").all()
        for admin in admins:
            admin.name = admin.first_name + " " + admin.last_name
        # print("found admins: ", admins)
        # Exclude password from response
        admins_data = [{k: v for k, v in admin.__dict__.items() if k != 'password'} for admin in admins]
        # print("admins_data: ", admins_data)
        return admins_data

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
