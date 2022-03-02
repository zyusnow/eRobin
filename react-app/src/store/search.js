const SET_TICKERS = "search/SET_TICKERS";

const setSearchTickers = (searchTickers) => {
  return {
      type:SET_TICKERS,
      searchTickers
  }
}

export const getSearchTickers = () => async dispatch =>{
    const response = await fetch("/api/search")

    if (response.ok) {
        const searchTickers = await response.json();
        dispatch(setSearchTickers(searchTickers));
        return "Success";
    } else {
        return "Fetch search tickers failed"
    }
}

const initialState = {}
export default function searchReducer(state=initialState, action) {
    let newState;
    switch (action.type) {
      case SET_TICKERS:
        newState = {...state}
        newState.tickers = action.searchTickers.reduce((searchTickers, searchTicker) => {
          searchTickers[searchTicker[0]] = searchTicker
          return searchTickers
      }, {})
        return newState
      default:
        return state;
    }
}
