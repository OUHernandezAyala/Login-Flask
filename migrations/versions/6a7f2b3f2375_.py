"""empty message

Revision ID: 6a7f2b3f2375
Revises: 8203f6fefd52
Create Date: 2024-01-13 20:37:03.973032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a7f2b3f2375'
down_revision = '8203f6fefd52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hashed', sa.String(length=300), nullable=False))
        batch_op.add_column(sa.Column('pepper', sa.String(length=300), nullable=False))
        batch_op.create_unique_constraint(None, ['password_hashed'])
        batch_op.create_unique_constraint(None, ['pepper'])
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('pepper')
        batch_op.drop_column('password_hashed')

    # ### end Alembic commands ###
