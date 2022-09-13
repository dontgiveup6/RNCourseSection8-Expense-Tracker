import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../consts/styles';
import { ExpensesContext } from '../store/expenses-contex';

export default function ManageExpensesScreen({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const edittedExpenseId = route.params?.expenseId;
  const isEditing = !!edittedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(edittedExpenseId);
    navigation.goBack();
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  function confirmExpenseHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(edittedExpenseId, {
        description: 'Update Testing!!!',
        amount: 2111.02,
        date: new Date('2022-09-11'),
      });
    } else {
      expensesCtx.addExpense({
        description: 'Add Testing!!!',
        amount: 1000.02,
        date: new Date('2022-09-12'),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={cancelExpenseHandler}
        >
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmExpenseHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
});
