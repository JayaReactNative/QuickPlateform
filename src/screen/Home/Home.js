import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import {banner} from '../../assets/Images';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containLog}>
          <Text style={styles.headText}>Hello John</Text>
          <Image source={banner} style={styles.imageStyle} />

{/* ----------not get image */}
          <View style={styles.rowView}>
            <View style={styles.viewCard}>
            <Image source={banner} style={styles.iconStyle} />
            <Text style={styles.iconName}>Transfer</Text>
            </View>
            <View style={styles.viewCard}>
            <Image source={banner} style={styles.iconStyle} />
            <Text style={styles.iconName}>Insurance</Text>
            </View>
            <View style={styles.viewCard}>
            <Image source={banner} style={styles.iconStyle} />
            <Text style={styles.iconName}>Gas</Text>
            </View>
          </View>



          <Text style={styles.blackText}>Recharge</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  headText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.themeColor,
    marginVertical: 10,
  },
  containLog: {
    paddingHorizontal: 18,
  },
  imageStyle: {
    width: 350,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 15,
  },
  blackText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Black,
    marginVertical: 15,
  },
  viewCard:{
   borderRadius:15,
   backgroundColor:Colors.SkyBlue,
   padding:5,
   width:105,
   alignItems:'center',
  },
  iconStyle:{
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  rowView:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:14
  },
  iconName:{
    fontSize: 13.5,
    fontWeight: '500',
    color: Colors.Black,
  }
});
