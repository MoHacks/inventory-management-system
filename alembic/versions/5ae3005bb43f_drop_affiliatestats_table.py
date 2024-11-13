"""drop AffiliateStats table

Revision ID: 5ae3005bb43f
Revises: bc3629236cb0
Create Date: 2024-10-22 10:00:34.180447

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5ae3005bb43f'
down_revision: Union[str, None] = 'bc3629236cb0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
