const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST';
const GET_WATCHLISTS = 'watchlist/GET_WATCHLIST';


const getWatchlists = (watchlists) => ({
    type: GET_WATCHLISTS,
    watchlists
});

const setWatchlist = (watchlist) => ({
    type: ADD_WATCHLIST,
    watchlist
});


// const deleteWatchlist = (watchlistId) => ({
//     type: DELETE_WATCHLIST,
//     watchlistId
// })


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



export const deleteUserWatchlist = (watchlistId) => async dispatch => {
    const response = await fetch(`/api/watchlist/delete/${watchlistId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // dispatch(deleteWatchlist(watchlistId))
        return "Delete successfully"
    }
}

export const addWatchlistTicker = (addInfo) => async (dispatch) => {
    const response = await fetch(`/api/watchlist/add_ticker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            addInfo
        })
    })

    if (response.ok) {
        return "Success"
    }
    else{
        return "Falied to add ticker into watchlist"
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




const initialState = {}
export default function watchlistReducer(state=initialState, action) {
    let newState;
    switch (action.type) {
        case GET_WATCHLISTS:
            newState = {...state}
            newState.watchlists = action.watchlists.reduce((watchlists, watchlist) => {
                watchlists[watchlist.id] = watchlist
                return watchlists
            }, {})
            return newState

        case ADD_WATCHLIST:
            newState = {...state}
            newState.watchlists[action.watchlist.id] = action.watchlist;
            return newState

        // case DELETE_WATCHLIST:
        //     newState = {...state}
        //     delete newState.watchlists[action.watchlistId]
        //     return newState
      default:
        return state;
    }
}
