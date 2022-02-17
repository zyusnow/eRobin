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

const initialState = {tickers: []}
export default function searchReducer(state=initialState, action) {
    let newState = {...state};
    switch (action.type) {
      case SET_TICKERS:
        newState.tickers = action.searchTickers;
        return newState
      default:
        return state;
    }
}
