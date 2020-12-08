import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import logo from './assets/logo.png';
Sound.setCategory('Playback');
const soundList = [
  'one.wav',
  'two.wav',
  'three.wav',
  'four.wav',
  'five.wav',
  'six.wav',
  'seven.wav',
  'eight.wav',
  'nine.wav',
  'ten.wav',
];
const App = () => {
  const playSound = (sound) => {
    const whoosh = new Sound(sound, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.log('unable to create sound object');
        console.log(err);
      } else {
        whoosh.play((success) => {
          if (success) {
            console.log('playing sound');
          } else {
            console.log('failed to play sound ');
            whoosh.reset();
          }
        });
      }
    });

    whoosh.release();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={logo} style={styles.logo} />
        <View style={styles.gridContainer}>
          {soundList.map((sound, index) => (
            <TouchableOpacity
              key={sound}
              style={styles.box}
              onPress={() => playSound(sound)}>
              <Text style={styles.text}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 40,
  },
  gridContainer: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  box: {
    height: 100,
    padding: 5,
    width: '46%',
    alignItems: 'center',
    backgroundColor: '#0f4c75',
    marginVertical: 7,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    color: '#44f301',
  },
});
export default App;
