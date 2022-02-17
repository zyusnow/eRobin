const GET_STOCK_INFO = 'stocks/getStockInfo'

const getStockInfo = (stockInfo) =>{
    return {
        type: GET_STOCK_INFO,
        stockInfo
    }
}


export const fetchStockInfo = ({ticker}) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${ticker}`)
    if(res.ok) {
        const stockInfo = await res.json();
        dispatch(getStockInfo(stockInfo))
        return "Success"
    }
    else{
        return "Fetch stock details failed"
    }
}

const initialState = {};

export default function stockInfoReducer(state=initialState, action){
    let newState = {...state};
    switch (action.type) {
        case GET_STOCK_INFO:
            newState.stockInfo = action.stockInfo
            return newState
        default:
            return state
    }
};
