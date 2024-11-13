from pydantic import BaseModel, EmailStr, Field
from typing import Optional
 
# Pydantic schema models to handle request bodies

class LoginModel(BaseModel):
    email: EmailStr
    password: str

class RegisterModel(LoginModel):
    #email: EmailStr  --> Provided by the inherited LoginModel
    #password: str --> Provided by the inherited LoginModel 
    firstName: str
    lastName: str
    location: str
    occupation: str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None