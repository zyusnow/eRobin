from .db import db
from datetime import datetime

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, default='Watchlist')
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))
    stock_id = db.Column(db.Integer,
        db.ForeignKey('stocks.id'))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='watchlistt')
    stock = db.relationship('Stock', back_populates='watchlistt')



    def to_dict(self):
        return {
          'id': self.id,
          'name': self.name,
          'user_id': self.user_id,
          'stock_id': self.stock_id
        }
