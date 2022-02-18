const SET_TRANSACTIONS = "holding/SET_TRANSACTIONS";

const setTransations = (transactions) => {
    return {
        type:SET_TRANSACTIONS,
        transactions
    }
  }

//thunk
export const getAllTransations = (userId) => async (dispatch) => {
    const response = await fetch(`/api/${userId}/transactions`);
    if (response.ok) {
        const transactions = await response.json();
        dispatch(setTransations(transactions));
        return transactions
    }
}

//reducer
const initialState = {}
export default function transactionReducer(state=initialState, action) {
    let newState = {...state};
    switch (action.type) {
      case SET_TRANSACTIONS:
        newState.transactions = action.transactions;
        return newState
      default:
        return state;
    }
}
