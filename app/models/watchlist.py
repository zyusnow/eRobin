from .db import db
from datetime import datetime

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, default='Watchlist')
    ticker = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='watchlist')


    def to_dict(self):
        return {
          'id': self.id,
          'name': self.name,
          'ticker': self.ticker,
          'user_id': self.user_id,
        }
