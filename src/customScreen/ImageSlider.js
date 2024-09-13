import React from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window'); // Get screen width for responsiveness

const images = [
  { id: '1', uri: require('../assets/banner/banner.png') },
  { id: '2', uri: require('../assets/banner/bannerFour.png') },
  { id: '3', uri: require('../assets/banner/bannerOne.png') },
  { id: '4', uri: require('../assets/banner/bannerTwo.png') },
  { id: '5', uri: require('../assets/banner/bannerFive.png') },
];

const ImageSlider = () => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        showPagination
        paginationStyleItem={{height:10,width:10}}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.child}>
            <Image source={item.uri} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    width: width*1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 340, 
    height: 200, 
    borderRadius: 10,
    marginRight:33
  },
});

export default ImageSlider;
