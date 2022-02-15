from .db import db
from datetime import datetime


class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.VARCHAR, nullable=False)
    company_name = db.Column(db.VARCHAR, nullable=False)

    def to_dict(self):
        return {
          'id': self.id,
          'ticker': self.ticker,
          'company_name': self.company_name
        }
