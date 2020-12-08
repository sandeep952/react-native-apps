import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

const currencyPerRupee = {
  dollar: 0.014,
  euro: 0.012,
  pound: 0.011,
  rubel: 0.93,
  ausdollar: 0.2,
  candollar: 0.019,
  yen: 1.54,
  dinar: 0.0043,
  bitcoin: 0.00004,
};
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  function handleTextChange(value) {
    setInputValue(value);
  }

  function handleButtonPress(currency) {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please enter a value',
        backgroundColor: '#E83350',
        textColor: '#000000',
      });
    }

    let result = parseFloat(inputValue) * currencyPerRupee[currency];
    result = result.toFixed(2);
    setResultValue(result);
  }
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            placeholder="Enter Amount (INR)"
            placeholderTextColor="white"
            value={inputValue}
            onChangeText={(inputValue) => handleTextChange(inputValue)}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultValue}</Text>
        </View>
        <View style={styles.currencyList}>
          {Object.keys(currencyPerRupee).map((currency) => (
            <TouchableOpacity
              key={currency}
              style={styles.currencyView}
              onPress={() => handleButtonPress(currency)}>
              <Text style={styles.currencyText}>{currency}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101518',
  },
  safeAreaView: {
    margin: 20,
  },
  resultContainer: {
    height: 70,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 40,
    height: 70,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  inputText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 22,
  },
  currencyList: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  currencyView: {
    margin: 0.5,
    height: 100,
    width: '33%',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#114269',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default App;
