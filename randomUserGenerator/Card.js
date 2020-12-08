import React, {Component} from 'react';
import {Text} from 'native-base';
import {Image, StyleSheet, View} from 'react-native';

const CardComponent = (props) => {
  const {person} = props;

  return (
    <View style={styles.card}>
      <View style={styles.cardItem}>
        <Image source={{uri: person.picture.large}} style={styles.image} />
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.personName}>
          {person.name.first} {person.name.last}
        </Text>
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.detailsText}>{person.dob.age} years old</Text>
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.detailsText}>
          Lives in {person.location.country}
        </Text>
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.detailsText}>Mob. {person.phone}</Text>
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.detailsText}>{person.email}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginTop: -70,
    borderColor: 'white',
    borderWidth: 3,
  },
  cardItem: {
    backgroundColor: '#4f8a8b',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4f8a8b',
    borderWidth: 1,
  },
  personName: {
    color: 'white',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  detailsText: {
    color: '#eee',
    fontSize: 15,
    marginVertical: 5,
    padding: 2,
  },
});

export default CardComponent;
