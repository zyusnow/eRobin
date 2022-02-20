from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist, db
from flask_login import current_user



def watchlist_exists(form, field):
    # Checking if watchlist exists
    name = field.data
    user_id = int(current_user.id)
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()

    for watchlist in user_watchlists:
        if watchlist.name == name:
            raise ValidationError('Watchlist already exist.')


class WatchlistForm(FlaskForm):
    name = StringField("name", validators = [DataRequired(), watchlist_exists])

