from sqlalchemy import update
from sqlalchemy.orm import Session
from datetime import datetime
from server.models.models import User
from .db import engine

# # create a new session
with Session(engine) as session:
#     # update the created_at and updated_at columns to current time for rows with NULL values
    session.execute(
        update(User)
        .where(User.created_at == None)
        .values(
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
    )
    session.commit()
