import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {leftArrow, notification } from "../assets/imagePath/Images";

const CommonHeader = ({
  optionImage,
  title,
  showBackIcon,
  onPress,
  Containerstyle,
  rightIconStyle
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, Containerstyle]}>
      {showBackIcon && (
        <TouchableOpacity
          style={styles.containItem}
          onPress={() => navigation.goBack()}
        >
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      <View style={{alignSelf: "center" }}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {optionImage && (
        <TouchableOpacity onPress={onPress} style={styles.rightHeaderIcon}>
          <Image source={notification} style={[styles.icon,rightIconStyle]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    // marginTop: 8 ,
    justifyContent: "center",
    width: "97%",
    paddingVertical: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  containItem: {
    position: "absolute",
    left: 0,
    zIndex: 0,
    paddingLeft: 10,
    paddingRight: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: '600',
    color:'black',
    textAlign: "center",
    lineHeight: 28,
  },
  icon: {
    height: 28,
    width: 25,
    resizeMode:'contain',
  },
  rightHeaderIcon: {
    paddingLeft: 30,
    paddingRight: 15,
    position: "absolute",
    right: 0,
    zIndex: 0,
  },
  backIcon: {
    height: 20,
    width: 10,
    tintColor: "white",
  //   transform: [{ rotateZ: "180deg" }],
  },
});

