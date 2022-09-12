import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../consts/styles';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

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
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e7',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e8',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e9',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e10',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
  {
    id: 'e11',
    description: 'monitor',
    amount: 190.21,
    date: new Date('2020-09-21'),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
