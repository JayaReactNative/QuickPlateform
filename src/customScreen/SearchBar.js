import React from 'react';
import { TextInput, View, StyleSheet, Image } from 'react-native';
import { unchecked } from '../assets/imagePath/Images';

const SearchBar = ({ placeholder, onChangeText,valueText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={unchecked} // Update with your icon path
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={valueText}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor='grey'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#f6f6f6',
    borderRadius: 10,
    padding: 8,
    width:'100%',
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginHorizontal:10,
    tintColor:'black'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',  
  },
});

export default SearchBar;
