const INITAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES': {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  default: return state;
  }
};

export default wallet;
