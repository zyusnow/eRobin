from app.models import db, WatchlistTicker

def seed_watchlist_ticker():
    ticker01 = WatchlistTicker(
        ticker = 'AAPL',
        watchlist_id = 1
    )

    ticker02 = WatchlistTicker(
        ticker = 'TSLA',
        watchlist_id = 1
    )

    db.session.add_all([ticker01, ticker02])
    db.session.commit()

def undo_watchlist_ticker():
  db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
  db.session.commit()
