import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0f4c75" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Your WatchList',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#00b7c2',
              },
            }}
          />

          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Add',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#00b7c2',
              },
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerStyle: {
                backgroundColor: '#0f4c75',
              },
              title: 'Edit',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#00b7c2',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f4c75',
  },
});

export default App;
