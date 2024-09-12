import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Replace with your actual image paths
const leftArrow = require('../assets/Icons/arrow.png'); // Left arrow image
const rightArrow = require('../assets/Icons/drop.png'); // Right arrow image

const HomeHeader = ({ title, subtitle, onLeftPress, onRightPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconWrapper}>
        <Image style={styles.icon} source={leftArrow} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onRightPress} style={styles.iconWrapper}>
        <Image style={styles.icon} source={rightArrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns items to the ends with space between
  },
  iconWrapper: {
    padding: 10, // Optional: add padding for touchable area
  },
  icon: {
    width: 24, // Adjust size as needed
    height: 24,
  },
  textContainer: {
    alignSelf: 'flex-start',
    width: '70%',
    marginHorizontal: 23,
    alignItems:'flex-start', // Center align text horizontally
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'orange',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
});

export default HomeHeader;
