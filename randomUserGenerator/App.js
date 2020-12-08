import Card from './Card';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import Axios from 'axios';
import {Spinner} from 'native-base';

//import Snackbar from 'react-native-snackbar'
const App = () => {
  const [person, setPerson] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shouldRefresh, setRefresh] = useState(false);
  const Loading = () => {
    return (
      <View>
        <Spinner
          color="green"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get('https://randomuser.me/api/');
      const {data} = response;

      setPerson(data.results[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPerson(null);
    }
  };
  useEffect(() => {
    getData();
  }, [shouldRefresh]);
  return (
    <View style={styles.container}>
      {isLoading || !person ? (
        <Loading />
      ) : (
        <View>
          <Card person={person} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setRefresh(!shouldRefresh)}>
            <Text style={styles.text}>Get New User</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192A56',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#3498DB',
    padding: 20,
    margin: 5,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
  },
});

export default App;
