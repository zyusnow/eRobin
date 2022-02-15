from .db import db


class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(40), nullable=False, unique=True)
    company_name = db.Column(db.String(100), nullable=False)

    transaction = db.relationship('Transaction', back_populates='stock')
    watchlist = db.relationship('Watchlist', back_populates='stock')
    holding = db.relationship('Holding', back_populates='stock')


    def to_dict(self):
        return {
          'id': self.id,
          'ticker': self.ticker,
          'company_name': self.company_name
        }
