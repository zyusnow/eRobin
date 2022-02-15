from .db import db
from datetime import datetime


class Holding(db.Model):
    __tablename__ = 'holdings'

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    total_shares = db.Column(db.Integer, nullable=False)
    avg_price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='holding')



    def to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'total_shares': self.total_shares,
            'avg_price': self.avg_price,
            'user_id': self.user_id
        }
