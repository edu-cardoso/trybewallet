const INITAL_STATE = {
  currencies: [],
  expenses: [],
  editedExpenseID: null,
  editMode: false,
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
  case 'EDITED_EXPENSES_ID': {
    return {
      ...state,
      editedExpenseID: action.payload.id,
    };
  }
  case 'EDIT_MODE': {
    return {
      ...state,
      editMode: action.payload.edit,
    };
  }
  default: return state;
  }
};

export default wallet;
