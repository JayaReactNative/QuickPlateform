import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../assets/Colors';

const TextImagecustom = ({
  ValueText,
  ChangeText,
  imageShow,
  imageHide,
  secureTextEntry,
  Title,
  IconAdd,
  TextinuptStyle,
  shownIcon,
  error,
  keyboardType = 'default',
  maxLength,
  onClick
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry || false);
  const [siIconShow, setIsIconShow] = useState(shownIcon || false);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View>
    <TouchableOpacity style={[styles.container1, TextinuptStyle]} onPress={onClick}>
      {shownIcon && (
        <Image
          source={IconAdd}
          style={styles.ImageStyle}
        />
      )}
      <TextInput
        placeholder={Title}
        placeholderTextColor="#7d8484"
        value={ValueText}
        onChangeText={ChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={styles.inputText}
        secureTextEntry={isSecure}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry}>
          <Image
            source={isSecure ? imageShow : imageHide}
            style={styles.ImageStyle}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    padding: 4,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: Colors.SkyBlue,
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    textAlign: 'left',
  },
  ImageStyle: {
    width: 20,
    height: 20,
    marginLeft: 9,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 10,
  },
});

export default TextImagecustom;
