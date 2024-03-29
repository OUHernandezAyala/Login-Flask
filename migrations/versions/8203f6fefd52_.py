"""empty message

Revision ID: 8203f6fefd52
Revises: 6665e9136c81
Create Date: 2024-01-13 01:27:16.889030

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8203f6fefd52'
down_revision = '6665e9136c81'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=200), nullable=False))
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###
