const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST';
const GET_WATCHLISTS = 'watchlist/GET_WATCHLIST';

const setWatchlist = (watchlist) => ({
    type: ADD_WATCHLIST,
    watchlist
});

const getWatchlists = (watchlists) => ({
    type: GET_WATCHLISTS,
    watchlists
});


// thunk
// export const getUserWatchlists = (userId) => async dispatch => {
//     const response = await fetch('/api/watchlist');
//     if (response.ok) {
//         const watchlists = await response.json();
//         dispatch(getWatchlists(watchlists));
//         return watchlists
//     }
// }

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
        return "Fetch holding failed";
    }
}

export const addWatchlist = ({name, userId}) => async dispatch => {
    console.log(name)
    console.log(userId)

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
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
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
      default:
        return state;
    }
}
