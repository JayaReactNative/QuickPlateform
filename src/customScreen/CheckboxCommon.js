import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CheckboxCommon = ({
    TextStyle,
    imageShow,
    imageHide,
    secureTextEntry,
    Title
  }) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry || false);
  
    const toggleSecureEntry = () => {
      setIsSecure(!isSecure);
    };
  
    return (
      <View style={styles.container1}>
         {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              source={isSecure ? imageShow : imageHide}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        )}
        <Text style={TextStyle}>{Title}</Text>
      </View>
    );
  };

export default CheckboxCommon;

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '90%',
    marginTop: 9,
    alignItems:"center"
  },
  ImageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain', 
    tintColor:'grey'
  },
});


