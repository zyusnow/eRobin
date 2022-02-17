from turtle import back
from .db import db


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))


    user = db.relationship('User', back_populates='watchlist')
    watchlist_tickers = db.relationship("WatchlistTicker", back_populates='watchlist')

    def to_dict(self):
        return {
          'id': self.id,
          'name': self.name,
          'user_id': self.user_id,
          "watchlist_tickers": [watchlist_ticker.to_dict() for watchlist_ticker in self.watchlist_tickers]
        }
