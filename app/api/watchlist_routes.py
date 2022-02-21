from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist, WatchlistTicker
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



@watchlist_routes.route("/delete/<int:id>", methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist_to_delete = Watchlist.query.get(id)
    if int(current_user.id) == int(watchlist_to_delete.user_id):
        db.session.delete(watchlist_to_delete)
        db.session.commit()
        return "Delete successfully"
    else:
        return 401


# add/remove ticker to watchlist routes
@watchlist_routes.route("/delete_ticker/<int:id>", methods=['PUT'])
@login_required
def delete_ticker(id):
    ticker = WatchlistTicker.query.get(id)
    db.session.delete(ticker)
    db.session.commit()
    return "Delete successfully"

@watchlist_routes.route("/add_ticker", methods=['POST'])
@login_required
def add_ticker():
    add_info_list = request.json['addInfo']
    for add_info in add_info_list:
        wl_id = add_info['id']
        wl_name = add_info['name']
        add_ticker = add_info['hasTicker']
        ticker = add_info['ticker']

        # first need to check whether the ticker exists in the watch list
        found_case = WatchlistTicker.query.filter_by(ticker=ticker, watchlist_id=wl_id).first()

        # for adding
        if add_ticker:
            # add only when no such record in db
            if not found_case:
                ticker_to_add = WatchlistTicker(
                    ticker=ticker,
                    watchlist_id=wl_id
                )
                print(f"*************** add new ticker {ticker} into {wl_name} ")
                db.session.add(ticker_to_add)
                db.session.commit()
        # for removing or no action
        else:
            # if there is an existing record, and user doesn't select it, then we need to remove  it from db
            if found_case:
                print(f"*************** remove ticker {ticker} from {wl_name} ")
                db.session.delete(found_case)
                db.session.commit()

    return "Add ticker successfully"
