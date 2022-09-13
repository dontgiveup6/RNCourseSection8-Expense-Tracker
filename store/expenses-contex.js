import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 60.11,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A laptop',
    amount: 660.11,
    date: new Date('2021-01-19'),
  },
  {
    id: 'e3',
    description: 'jacket',
    amount: 160.11,
    date: new Date('2022-06-19'),
  },
  {
    id: 'e4',
    description: 'book',
    amount: 10.11,
    date: new Date('2020-06-29'),
  },
  {
    id: 'e5',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e6',
    description: 'panths',
    amount: 10.21,
    date: new Date('2022-09-11'),
  },
  {
    id: 'e7',
    description: 'trainers',
    amount: 160.0,
    date: new Date('2022-09-08'),
  },
  {
    id: 'e8',
    description: 'wallet',
    amount: 65.15,
    date: new Date('2022-09-09'),
  },
  {
    id: 'e9',
    description: 'keyboard',
    amount: 170.21,
    date: new Date('2022-09-07'),
  },
  {
    id: 'e10',
    description: 'pad',
    amount: 19.21,
    date: new Date('2022-09-11'),
  },
  {
    id: 'e11',
    description: 'socks',
    amount: 7.21,
    date: new Date('2022-09-12'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],

  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updateItem;

      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
