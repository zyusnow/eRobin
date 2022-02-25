const SET_TRANSACTIONS = "holding/SET_TRANSACTIONS";

const setTransations = (transactions) => {
  return {
    type: SET_TRANSACTIONS,
    transactions
  }
}

//thunk
export const getAllTransations = (userId) => async (dispatch) => {
  const response = await fetch(`/api/user/${userId}/transactions`);
  if (response.ok) {
    const transactions = await response.json();
    dispatch(setTransations(transactions));
    return transactions
  }
}

//reducer
const initialState = {}
export default function transactionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_TRANSACTIONS:
      newState = {...state}
      newState.transactions = action.transactions.reduce((transactions, transaction) => {
        transactions[transaction.id] = transaction
        return transactions
      }, {})
      return newState
    default:
      return state;
  }
}
