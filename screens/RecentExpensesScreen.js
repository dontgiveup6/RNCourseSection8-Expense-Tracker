import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';

export default function RecentExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
}

const styles = StyleSheet.create({});
