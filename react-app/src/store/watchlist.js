const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST';
const GET_WATCHLISTS = 'watchlist/GET_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';
const EDIT_WATCHLIST = 'watchlist/EDIT_WATCHLIST';
const ADD_TICKER = 'watchlist/ADD_TICKER';
const DELETE_TICKER = 'watchlist/DELETE_TICKER';

const setWatchlist = (watchlist) => ({
    type: ADD_WATCHLIST,
    watchlist
});

const getWatchlists = (watchlists) => ({
    type: GET_WATCHLISTS,
    watchlists
});

//no need at all
// const deleteWatchlist = (watchlistId) => ({
//     type: DELETE_WATCHLIST,
//     watchlistId
// })

const editWatchlist = (watchlist) => ({
    type: EDIT_WATCHLIST,
    watchlist
})

const addTicker = (ticker) => {
    return {
        type: ADD_TICKER,
        ticker
    }
}


const deleteTicker = (watchlist) => {
    return {
        type: DELETE_TICKER,
        watchlist
    }
}

// thunk
export const getUserWatchlists = (userId) => async dispatch =>{
    const response = await fetch(`/api/watchlist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId
      })

    });

    if (response.ok) {
        const watchlists = await response.json();
        dispatch(getWatchlists(watchlists));
        return "Success";
    } else {
        return "Fetch watchlist failed";
    }
}

export const addWatchlist = ({name, userId}) => async dispatch => {
//{name, userId} must have {}, if without {}, name will be name and userId
    const response = await fetch(`/api/watchlist/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            userId
        })
    });

    if (response.ok) {
        const watchlist = await response.json()
        dispatch(setWatchlist(watchlist))
        return watchlist
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editUserWatchlist = ({ watchlistId, name }) => async (dispatch)  => {
    const response = await fetch(`/api/watchlist/edit/${watchlistId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    })

    if (response.ok) {
        const watchlist = await response.json()
        dispatch(editWatchlist(watchlist))
        return watchlist
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}



export const deleteUserWatchlist = (watchlistId) => async dispatch => {
    const response = await fetch(`/api/watchlist/delete/${watchlistId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        //dispatch(deleteWatchlist(watchlistId))
        return "Delete successfully"
    }
}


export const deleteWatchlistTicker = ({ ticker, tickerId }) => async (dispatch)  => {
    const response = await fetch(`/api/watchlist/delete_ticker/${tickerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker
        })
    })

    if (response.ok) {
        return "Delete successfully"
    }
}

export const addWatchlistTicker = ({ ticker, watchlistId }) => async (dispatch) => {
    const response = await fetch(`/api/watchlist/add_ticker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker,
            watchlistId
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addTicker(data.ticker_to_add))
        return data
    }
}


const initialState = {}
export default function watchlistReducer(state=initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_WATCHLIST:
            newState = {...state}
            newState.watchlist = action.watchlist;
            return newState
        case GET_WATCHLISTS:
            newState = {...state}
            newState.watchlists = action.watchlists.reduce((watchlists, watchlist) => {
                watchlists[watchlist.id] = watchlist
                return watchlists
            }, {})
            return newState
        case DELETE_WATCHLIST:
            newState = {...state}
            //delete newState.watchlist[action.watchlistId]
            return newState
        case DELETE_TICKER:
            newState = {...state}
            return newState
        case ADD_TICKER:
            newState = {...state}
            newState[action.ticker.id] = action.ticker
            return newState
      default:
        return state;
    }
}
