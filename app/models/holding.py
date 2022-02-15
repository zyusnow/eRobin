from .db import db
from datetime import datetime


class Holding(db.Model):
    __tablename__ = 'holdings'

    id = db.Column(db.Integer, primary_key=True)
    total_shares = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id'))
    stock_id = db.Column(db.Integer,
        db.ForeignKey('stocks.id'))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='holding')
    stock = db.relationship('Stock', back_populates='holding')



    def to_dict(self):
        return {
            'id': self.id,
            'total_shares': self.total_shares,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
        }
