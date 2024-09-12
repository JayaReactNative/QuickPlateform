import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Alert, Image } from 'react-native';
import ButtonCustom from '../../customScreen/ButtonCustom';
import { Colors } from '../../assets/Colors';
import {WelcomImg } from '../../assets/Images';
import { String } from '../../utility/CommonText';

const WelcomeScreen = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Login')
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#056a6d"
        barStyle="dark-content"
      />
  <Image source={WelcomImg} style={styles.imageStyle}/>
      <Text style={styles.headText}>Multiply your Income</Text>
      <Text style={styles.smallText}>Save More. Invest More. Earn More.</Text>
      <Text style={styles.smallText}>{String.UTILIZE_SAVING}</Text>
      <ButtonCustom
        title="Get Started"
        onClickButton={handlePress}
        colors={[Colors.themegreen, Colors.ThemelightGreen]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.8 }}
        textColor="white"
        width={200}
        Buttonstyle={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 }}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.White
  },
  headText:{
    fontSize:25,
    fontWeight:'700',
    color:Colors.themeColor,
    marginVertical:15,
    marginTop: 25,
  },
  smallText:{
    fontSize:12,
    fontWeight:'400',
    color:Colors.themeColor,
    marginVertical:5
  },
  imageStyle:{
    width:300,height:250,resizeMode:'contain'
  }
});
