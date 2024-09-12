import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Image, View} from 'react-native';
import {Saving} from '../../assets/Images';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image
          source={Saving}
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
    width: 65,
    height: 65,
  },
});

export default Splash;
