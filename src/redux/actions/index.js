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

export {
  saveUserEmail,
  fetchCurrencies,
  savesExpenses,
  deleteExpenses,
};
