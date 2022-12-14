import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-contex';
import { getDateMinusDays } from '../util/date';

export default function RecentExpensesScreen() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

const styles = StyleSheet.create({});
