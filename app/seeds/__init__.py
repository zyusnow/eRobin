from flask.cli import AppGroup
from .users import seed_users, undo_users
from .watchlists import seed_watchlists, undo_watchlists
from .watchlist_ticker import seed_watchlist_ticker, undo_watchlist_ticker

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_watchlists()
    seed_watchlist_ticker()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_watchlists()
    undo_watchlist_ticker()
