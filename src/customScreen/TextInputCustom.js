import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputCustom = ({ ValueText, ChangeText,Title }) => {
  return (
    <View style={styles.container1}>
      <TextInput 
        placeholder={Title}
        placeholderTextColor='lightgrey'
        value={ValueText}
        onChangeText={ChangeText}
        keyboardType='default'
        style={styles.inputText}
      />
    </View>
  );
}

export default TextInputCustom;

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'darkgrey',
    padding: 4,
    // width: '95%',
    marginTop: 8,
    backgroundColor: 'white',
  },
  inputText: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 15,
    borderRadius: 8,
    textAlign: 'left',
  }
});
