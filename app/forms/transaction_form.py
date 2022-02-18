from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, NumberRange


class TransactionForm(FlaskForm):
    transaction_shares = IntegerField("transaction_shares", validators = [DataRequired(), NumberRange(min=1, message="Please enter a valid shares number")])
    transaction_type = StringField("transaction_type", validators = [DataRequired()])
