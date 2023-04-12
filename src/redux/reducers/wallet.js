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
  case 'SAVES_EXPENSES': {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  }
  case 'DELETE_EXPENSES': {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => action.payload.id !== id),
    };
  }
  default: return state;
  }
};

export default wallet;
