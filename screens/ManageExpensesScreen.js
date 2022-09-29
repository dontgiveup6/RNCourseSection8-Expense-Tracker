import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../consts/styles';
import { ExpensesContext } from '../store/expenses-contex';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

export default function ManageExpensesScreen({ route, navigation }) {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const edittedExpenseId = route.params?.expenseId;
  const isEditing = !!edittedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === edittedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      expensesCtx.deleteExpense(edittedExpenseId);
      await deleteExpense(edittedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense. Please try again!');
      setIsSubmiting(false);
    }
  }

  function cancelExpenseHandler() {
    navigation.goBack();
  }

  async function confirmExpenseHandler(expenseData) {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(edittedExpenseId, expenseData);
        await updateExpense(edittedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Counld not save data.Please try again later!');
      setIsSubmiting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelExpenseHandler}
        onSubmit={confirmExpenseHandler}
        defaultValues={selectedExpense}
      />
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
  deleteContainer: {
    marginTop: 24,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
});
