const SET_HOLDING = "holding/SET_HOLDING";

const setHolding = (holding) => {
  return {
      type:SET_HOLDING,
      holding
  }
}

export const getHolding = (ticker, userId) => async dispatch =>{
    const response = await fetch(`/api/holding/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          ticker,
          userId
      })

    });

    if (response.ok) {
        const holding = await response.json();
        dispatch(setHolding(holding));
        return "Success";
    } else {
        return "Fetch holding failed";
    }
}

export const putOrder = (orderInfo) => async dispatch =>{
  const response = await fetch(`/api/holding/`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({orderInfo})

  });

  if (response.ok) {
      return "Success";
  } else {
      return "Put order failed";
  }
}

const initialState = {}
export default function holdingReducer(state=initialState, action) {
    let newState = {...state};
    switch (action.type) {
      case SET_HOLDING:
        newState.holding = action.holding;
        return newState
      default:
        return state;
    }
}
