from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist, db



def watchlist_exists(form, field):
    # Checking if watchlist exists
    name = field.data
    watchlist = Watchlist.query.filter(Watchlist.name == name).first()
    if watchlist:
        raise ValidationError('Watchlist name is already in use.')


class WatchlistForm(FlaskForm):
    name = StringField("name", validators = [DataRequired(), watchlist_exists])
