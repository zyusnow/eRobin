from .db import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    transaction_shares = db.Column(db.Integer, nullable=False)
    transaction_price = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='transaction')


    def to_dict(self):
        return {
          'id': self.id,
          'ticker': self.ticker,
          'transaction_shares': self.transaction_shares,
          'transaction_price': self.transaction_price,
          'transaction_type': self.transaction_type,
          'user_id': self.user_id,
          'createdAt': self.createdAt
        }
