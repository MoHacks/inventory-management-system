"""drop AffiliateStats table

Revision ID: bc3629236cb0
Revises: 7e03a8700bf4
Create Date: 2024-10-22 09:56:27.285988

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bc3629236cb0'
down_revision: Union[str, None] = '7e03a8700bf4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   pass


def downgrade() -> None:
   pass
