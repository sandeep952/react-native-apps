import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import diceOne from './assets/dice/dice1.png';
import diceTwo from './assets/dice/dice2.png';
import diceThree from './assets/dice/dice3.png';
import diceFour from './assets/dice/dice4.png';
import diceFive from './assets/dice/dice5.png';
import diceSix from './assets/dice/dice6.png';

const App = () => {
  const [diceOneUri, setDiceOneUri] = useState(diceOne);
  const [diceTwoUri, setDiceTwoUri] = useState(diceOne);

  function handlePlayButtonPress() {
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber1) {
      case 1:
        setDiceOneUri(diceOne);
        break;
      case 2:
        setDiceOneUri(diceTwo);
        break;
      case 3:
        setDiceOneUri(diceThree)
        break;

      case 4:
        setDiceOneUri(diceFour)
        break;

      case 5:
        setDiceOneUri(diceFive)
        break;

      case 6:
        setDiceOneUri(diceSix);
        break;

      default:
        setDiceOneUri(diceOne);
    }
    switch (randomNumber2) {
      case 1:
        setDiceTwoUri(diceOne);
        break;
      case 2:
        setDiceTwoUri(diceTwo);
        break;
      case 3:
        setDiceTwoUri(diceThree)
        break;

      case 4:
        setDiceTwoUri(diceFour)
        break;

      case 5:
        setDiceTwoUri(diceFive)
        break;

      case 6:
        setDiceTwoUri(diceSix);
        break;

      default:
        setDiceTwoUri(diceOne);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayButtonPress}>
        <Image style={styles.image} source={diceOneUri} />
        <Image style={styles.image} source={diceTwoUri} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222822',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  btn: {
    backgroundColor: '#ff7558',
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    borderRadius: 15,
  },
});
export default App;
