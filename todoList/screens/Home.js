import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {
  Container,
  Fab,
  H1,
  Icon,
  Left,
  List,
  ListItem,
  Button,
  Body,
  Right,
  CheckBox,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Home = ({navigation, route}) => {
  const [listOfSeries, setlistOfSeries] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    const storedValue = await AsyncStorage.getItem('season_list');
    if (storedValue) {
      const list = await JSON.parse(storedValue);
      setlistOfSeries(list);
    } else setlistOfSeries([]);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [useIsFocused()]);

  const deleteSeason = async (id) => {
    const list = listOfSeries.filter((item) => item.id !== id);
    await AsyncStorage.setItem('season_list', JSON.stringify(list));

    setlistOfSeries(list);
  };
  const toggleCompleted = async (id) => {
    const list = listOfSeries.map((item) => {
      if (item.id === id) {
        item.isWatched = !item.isWatched;
      }
      return item;
    });
    await AsyncStorage.setItem('season_list', JSON.stringify(list));
    setlistOfSeries(list);
  };

  if (isLoading) {
    return (
      <Container style={{...styles.container, justifyContent: 'center'}}>
        <Spinner color="#00b7c2" />
      </Container>
    );
  }
  return (
    <Container style={styles.container}>
      {listOfSeries.length === 0 ? (
        <H1 style={styles.heading}>WatchList is empty. Please add a series</H1>
      ) : (
        <View style={styles.container}>
          <H1 style={styles.heading}>Series to watch !</H1>
          <ScrollView>
            <List>
              {listOfSeries.map((item) => (
                <ListItem style={styles.listItem} key={item.id}>
                  <Left>
                    <Button
                      danger
                      style={styles.actionButton}
                      onPress={() => deleteSeason(item.id)}>
                      <Icon name="trash" />
                    </Button>
                    <Button
                      style={styles.actionButton}
                      onPress={() => navigation.navigate('Edit', {item})}>
                      <Icon name="edit" type="Feather" />
                    </Button>
                  </Left>

                  <Body>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.season} note>
                      {item.seasons} seasons to watch
                    </Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={item.isWatched}
                      onPress={() => toggleCompleted(item.id)}
                    />
                  </Right>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </View>
      )}

      <Fab
        position="bottomRight"
        style={{backgroundColor: '#5067FF'}}
        onPress={() => navigation.navigate('Add')}>
        <Icon name="add" />
      </Fab>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F363F',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
    color: 'white',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  title: {
    color: '#eee',
    fontSize: 18,
  },
  season: {
    color: '#eee',
    fontSize: 12,
    color: '#7B8788',
  },
});
export default Home;
