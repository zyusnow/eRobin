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


@watchlist_routes.route("/new", methods=['POST'])
@login_required
def add_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_watchlist = Watchlist(
            name = form.data['name']
        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@watchlist_routes.route("/edit/<int:id>", methods=['PUT'])
@login_required
def edit_watchlist(id):
    watchlist_to_edit = Watchlist.query.get(id)
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist_to_edit.name = form.data['name']
        db.session.add(watchlist_to_edit)
        db.session.commit()
        return watchlist_to_edit.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


