from app.models import db, Watchlist

def seed_watchlists():
    watchlist01 = Watchlist(
        name = 'my watchlist',
        user_id = 1
    )

    watchlist02 = Watchlist(
        name = 'technical',
        user_id = 1
    )

    db.session.add_all([watchlist01, watchlist02])
    db.session.commit()

def undo_watchlists():
  db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
  db.session.commit()
