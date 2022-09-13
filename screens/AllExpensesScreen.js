import { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-contex';

export default function AllExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="Not registered expenses found"
    />
  );
}

const styles = StyleSheet.create({});
