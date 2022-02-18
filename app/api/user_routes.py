from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Transaction

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# user transaction
@user_routes.route('/<int:userId>/transactions')
@login_required
def get_transactions(userId):
    transactions = Transaction.query.filter(Transaction.user_id == userId).all()
    return jsonify([transaction.to_dict() for transaction in transactions])
