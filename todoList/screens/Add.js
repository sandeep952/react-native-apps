import AsyncStorage from '@react-native-community/async-storage';
import {Button, Container, Form, H1, Input, Item} from 'native-base';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import shortid from 'shortid';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [seasons, setSeasons] = useState('');

  const addToList = async () => {
    try {
      if (!name || !seasons) {
        return Snackbar.show({
          text: 'Please add both fields',
          textColor: '#eee',
        });
      }

      const seasonToAdd = {
        id: shortid.generate(),
        name,
        seasons,
        isWatched: false,
      };
      const storedValue = await AsyncStorage.getItem('season_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('season_list', JSON.stringify(prevList));
      }
      setName('');
      setSeasons('');
      Keyboard.dismiss();
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container style={styles.container}>
      <H1 style={{textAlign: 'center', color: '#00b7c2', marginVertical: 15}}>
        Add to Watchlist
      </H1>
      <Form>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="Enter name"
            style={styles.input}
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </Item>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="Enter seasons"
            style={styles.input}
            value={seasons}
            keyboardType="numeric"
            onChangeText={(value) => setSeasons(value)}
          />
        </Item>
        <Button rounded block onPress={addToList}>
          <Text style={{color: '#eee'}}>Add</Text>
        </Button>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F363F',
    padding: 10,
  },
  formItem: {
    marginBottom: 20,
  },
  input: {
    textAlign: 'center',
    color: '#eee',
  },
});
export default Add;
