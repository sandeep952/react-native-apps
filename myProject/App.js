import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const App = () => {
  const [darkMode, toggleDarkMode] = useState(true);

  function handleThemeChange() {
    toggleDarkMode(!darkMode);
  }

  const backgroundColor = darkMode ? 'black' : 'white';
  const textColor = darkMode ? 'black' : 'white';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <StatusBar backgroundColor={backgroundColor}
      barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={handleThemeChange}>
        <Text
          style={[
            styles.text,
            {
              backgroundColor: darkMode ? 'white' : 'black',
              color: textColor,
            },
          ]}>
          Toggle Dark Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 20,
    borderRadius: 20,
  },
});

export default App;
