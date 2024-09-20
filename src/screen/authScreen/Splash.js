import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Image, View} from 'react-native';
import { QuickLogo } from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Splash = ({navigation}) => {
  useEffect(() => {
    const checkUserToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken'); 
      if (userToken) {
        navigation.navigate('MainTabs'); 
      } else {
        const timer = setTimeout(() => {
          navigation.navigate('WelcomeScreen'); 
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    };
  
    checkUserToken();
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={QuickLogo}
          style={styles.imageBackground}
          resizeMode="cover"
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: 95,
    height: 110,
    resizeMode:"contain"
  },
});


export default Splash;

