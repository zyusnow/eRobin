from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Watchlist, WatchlistTicker
from app.forms import WatchlistForm


watchlist_routes = Blueprint('watchlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@watchlist_routes.route("/<int:user_id>")
@login_required
def get_watchlist(user_id):
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return jsonify([watchlist.to_dict() for watchlist in user_watchlists])


# @watchlist_routes.route("/new", methods=['POST'])
# @login_required
