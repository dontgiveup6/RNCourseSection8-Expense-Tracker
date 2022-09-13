import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel }) {
  //   const [amountValue, setAmountValue] = useState('');
  //   const [dateValue, setDateValue] = useState('');
  //   const [descriptionValue, setDescriptionValue] = useState('');
  const [inputValues, setInputValue] = useState({
    amount: '',
    date: '',
    description: '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValue((currentValue) => {
      return { ...currentValue, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {}

  return (
    <View style={styles.form}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: 'none', defaulth is 'sentances'
          //   autoCorrect: false, default is true
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { minWidth: 120, marginHorizontal: 8 },
});
