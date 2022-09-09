import { Text, View, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';

export default function AllExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Total" />;
}

const styles = StyleSheet.create({});
