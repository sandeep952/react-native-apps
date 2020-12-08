import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icons from './components/Icons';
import {
  Container,
  Title,
  Content,
  Header,
  Body,
  H1,
  H3,
  Button,
} from 'native-base';
import Snackbar from 'react-native-snackbar';

const itemsArray = new Array(9).fill('empty');

const App = () => {
  const [isCrossTurn, setCrossTurn] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  console.log(itemsArray);
  const changeItem = (itemNumber) => {
    if (winMessage)
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#FFF',
      });

    if (itemsArray[itemNumber] != 'empty')
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: '#000',
        textColor: '#FFF',
      });
    itemsArray[itemNumber] = isCrossTurn ? 'cross' : 'circle';
    checkIsWinner();
    setCrossTurn(!isCrossTurn);
  };
  const reloadGame = () => {
    console.log('reload');
    itemsArray.fill('empty', 0, 9);
    setCrossTurn(!isCrossTurn);
    setWinMessage('');
  };
  const checkIsWinner = () => {
    let winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPositions.length; i++) {
      let currWinPos = winPositions[i];

      if (
        itemsArray[currWinPos[0]] !== 'empty' &&
        itemsArray[currWinPos[0]] === itemsArray[currWinPos[1]] &&
        itemsArray[currWinPos[1]] === itemsArray[currWinPos[2]]
      ) {
        setWinMessage(`${itemsArray[currWinPos[0]]}  Won`);
        break;
      }
    }
  };

  return (
    <Container style={{backgroundColor: '#333945'}}>
      <Header>
        <Body>
          <Title style={{paddingLeft: 5}}>Tic Tac Toe</Title>
        </Body>
      </Header>
      <Content padder>
        <View style={styles.grid}>
          {itemsArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => changeItem(index)}>
              <View style={styles.card}>
                <Icons name={item} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {winMessage ? (
          <View>
            <H1 style={styles.winMessage}>{winMessage}</H1>
          </View>
        ) : (
          <Text style={styles.turnMessage}>
            {isCrossTurn ? 'Cross' : 'Circle'} turn
          </Text>
        )}
        <Button primary block rounded onPress={reloadGame}>
          <Text style={{fontSize: 18, color: 'white'}}>Reload Game</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: '32%',
    height: 100,
    margin: 1,
  },
  turnMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
    fontSize: 26,
  },
  card: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: 'black',
  },
  winMessage: {
    fontSize: 30,
    margin: 20,
    color: 'white',
    textTransform:'uppercase',
    textAlign:'center',
  },
});

export default App;
