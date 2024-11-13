"""table updated

Revision ID: 65b6c887f68e
Revises: 5ae3005bb43f
Create Date: 2024-10-22 10:06:06.722186

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '65b6c887f68e'
down_revision: Union[str, None] = '5ae3005bb43f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
