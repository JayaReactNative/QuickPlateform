import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonCustom = ({
  title,
  onClickButton,
  colors = ['#4c669f', '#3b5998', '#192f6a'],
  start = { x: 0.0, y: 0.10},
  end = { x: 0, y: 1.5 },
  locations = [0, 0.5, 0.6],
  textColor = 'white',
  width = '100%',
  Buttonstyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onClickButton}
      style={[styles.buttonContainer, { width }, Buttonstyle]}
    >
      <LinearGradient
        start={start}
        end={end}
        locations={locations}
        colors={colors}
        style={styles.linearGradient}
      >
        <Text style={[styles.textStyle, { color: textColor }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  linearGradient: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '700',
  },
});
