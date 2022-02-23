const SET_HOLDING = "holding/SET_HOLDING";
const SET_ALL_HOLDING = "holding/SET_ALL_HOLDING";
const SET_PORTFOLIO = "holding/SET_PORTFOLIO"

const setPortfolio = (portfolio) => {
  return {
      type:SET_PORTFOLIO,
      portfolio
  }
}

const setAllHoldings = (holdings) => {
  return {
      type:SET_ALL_HOLDING,
      holdings
  }
}

const setHolding = (holding) => {
  return {
      type:SET_HOLDING,
      holding
  }
}

export const getPortfolio = (userId) => async dispatch =>{
  const response = await fetch(`/api/holding/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  })
  if (response.ok) {
    const portfolioInfo = await response.json();
    dispatch(setPortfolio(portfolioInfo));
    return "Success";
  }
  else{
    return "Fetch portfilio failed"
  }
}

export const getAllHoldings = (userId) => async dispatch =>{
  const response = await fetch(`/api/holding/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  })
  if (response.ok) {
    const holdings = await response.json();
    dispatch(setAllHoldings(holdings));
        return holdings;
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
      case SET_PORTFOLIO:
        newState.portfolio = action.portfolio;
        return newState
      case SET_ALL_HOLDING:
        newState.holdings = action.holdings.reduce((holdings, holding) => {
          holdings[holding.id] = holding
          return holdings
      }, {})
        return newState
      default:
        return state;
    }
}
