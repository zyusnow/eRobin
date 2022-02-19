from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist
from app.forms import WatchlistForm


watchlist_routes = Blueprint('watchlist', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@watchlist_routes.route('/', methods=["POST"])
#@login_required
def get_watchlists():
    user_id = request.json['userId']
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return jsonify([watchlist.to_dict() for watchlist in watchlists])


@watchlist_routes.route("/new", methods=['POST'])
@login_required
def add_watchlist():
    user_id = int(request.json['userId'])
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_watchlist = Watchlist(
            user_id = user_id,
            name = form.data['name']
        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @watchlist_routes.route("/edit/<int:id>", methods=['PUT'])
# @login_required
# def edit_watchlist(id):
#     watchlist_to_edit = Watchlist.query.get(id)
#     form = WatchlistForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         watchlist_to_edit.name = form.data['name']
#         db.session.add(watchlist_to_edit)
#         db.session.commit()
#         return watchlist_to_edit.to_dict()

#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# @watchlist_routes.route("/delete/<int:id>", methods=['DELETE'])
# @login_required
# def edit_watchlist(id):
#     watchlist_to_delete = Watchlist.query.get(id)
#     if int(current_user.id) == int(watchlist_to_delete.userId):
#         db.session.delete(watchlist_to_delete)
#         db.session.commit()
#         return "Delete successfully"
#     else:
#         return 401
