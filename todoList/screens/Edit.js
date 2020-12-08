import AsyncStorage from '@react-native-community/async-storage';
import {Button, Container, Form, H1, Input, Item} from 'native-base';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';

const Edit = ({navigation, route}) => {
  const {item} = route.params;
  const [name, setName] = useState(item.name);
  const [seasons, setSeasons] = useState(item.seasons);

  const updateList = async () => {
    try {
      if (!name || !seasons) {
        return Snackbar.show({
          text: 'Please add both fields',
          textColor: '#eee',
        });
      }
      let list = await AsyncStorage.getItem('season_list');
      list = await JSON.parse(list);
      list.map((currItem) => {
        if (currItem.id === item.id) {
          currItem.name = name;
          currItem.seasons = seasons;
        }
        return currItem;
      });
      await AsyncStorage.setItem('season_list', JSON.stringify(list));
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
        <Button rounded block onPress={updateList}>
          <Text style={{color: '#eee'}}>Edit</Text>
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
export default Edit;
