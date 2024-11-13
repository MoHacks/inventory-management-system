"""drop affiliate_stats table

Revision ID: 2594fadf0d30
Revises: 65b6c887f68e
Create Date: 2024-10-22 10:08:49.981055

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2594fadf0d30'
down_revision: Union[str, None] = '65b6c887f68e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    # Drop the table only if it still exists
    op.execute('DROP TABLE IF EXISTS affiliate_stats CASCADE')

def downgrade():
    # Recreate the table in the downgrade function (if needed)
    op.create_table(
        'affiliate_stats',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('product_id', sa.Integer, nullable=False),
        sa.Column('yearly_sales_total', sa.Float, nullable=False),
        sa.Column('yearly_total_sold_units', sa.Integer, nullable=False)
    )