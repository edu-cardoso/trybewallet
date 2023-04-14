const saveUserEmail = (email) => ({
  type: 'SAVE_USER',
  payload: {
    email,
  },
});

const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  payload: {
    currencies,
  },
});

const fetchCurrencies = () => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  const currenciesFiltered = Object.keys(data)
    .filter((currencie) => currencie !== 'USDT');
  dispatch(getCurrencies(currenciesFiltered));
};

const savesExpenses = (expenses) => ({
  type: 'SAVES_EXPENSES',
  payload: {
    expenses,
  },
});

const deleteExpenses = (id) => ({
  type: 'DELETE_EXPENSES',
  payload: {
    id,
  },
});

const expenseID = (id) => ({
  type: 'EDITED_EXPENSES_ID',
  payload: {
    id,
  },
});

const editMode = (edit) => ({
  type: 'EDIT_MODE',
  payload: {
    edit,
  },
});

export {
  saveUserEmail,
  fetchCurrencies,
  savesExpenses,
  deleteExpenses,
  expenseID,
  editMode,
};
