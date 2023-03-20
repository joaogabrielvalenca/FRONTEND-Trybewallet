// Coloque aqui suas actions

const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const ADD_TOTAL_EXPENSES = 'ADD_TOTAL_EXPENSES';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

const addTotalExpenses = (totalExpenses) => ({
  type: ADD_TOTAL_EXPENSES,
  payload: totalExpenses,
});

export {
  addEmail,
  addCurrencies,
  addExpenses,
  addTotalExpenses,
  ADD_EMAIL,
  ADD_CURRENCIES,
  ADD_EXPENSES,
  ADD_TOTAL_EXPENSES,
};
