const SET_STOCK_DETAILS = 'stocks/setStockDetails'

const setStockDetails = (stockDetails) =>{
    return {
        type: SET_STOCK_DETAILS,
        stockDetails
    }
}


export const getStockDetails = ({ticker}) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${ticker}`)
    if(res.ok) {
        const stockDetails = await res.json();
        dispatch(setStockDetails(stockDetails))
        return "Success"
    }
    else{
        return "Fetch stock details ailed"
    }
}

const initialState = {};

export default function stockDetailsReducer(state=initialState, action){
    let newState = {...state};
    switch (action.type) {
        case SET_STOCK_DETAILS:
            newState.stockDetails = action.stockDetails
            return newState
        default:
            return state
    }
};

