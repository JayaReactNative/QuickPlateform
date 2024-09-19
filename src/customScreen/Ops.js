import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LeftArrow } from '../assets/Images';

export default function Ops({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={LeftArrow} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Ops!</Text>
      <Text style={styles.message}>
        Something went wrong. Please try again later or contact support if the problem persists.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa', // Light background color for professionalism
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Dark text color for readability
  },
  message: {
    fontSize: 16,
    color: '#6c757d', // Gray color for secondary text
    textAlign: 'center',
    marginTop: 8,
  },
});
