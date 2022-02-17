from .db import db
import os

class WatchlistTicker(db.Model):
    __tablename__ = 'watchlist_tickers'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    watchlist_id = db.Column(db.Integer,
        db.ForeignKey('watchlists.id'))

    watchlist = db.relationship("Watchlist", back_populates="watchlist_tickers")

    def to_dict(self):

        #need to pull the price of the ticker in the watchlist
        # finnhub_client = finnhub.Client(os.environ.get("FINNHUB_API_KEY"))

        # price = finnhub_client.quote(self.ticker.upper())

        # value = price["c"]
        return {
            "id": self.id,
            "ticker": self.ticker,
            "watchlist_id": self.watchlist_id,
            # "price": value
        }
