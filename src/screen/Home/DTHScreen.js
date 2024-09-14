import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LeftArrow } from '../../assets/Images';
import { Colors } from '../../assets/Colors';
import ImageSlider from '../../customScreen/ImageSlider';
import TextInputCustom from '../../customScreen/TextInputCustom';
import RNPickerSelect from 'react-native-picker-select';

const DTHScreen = ({ navigation }) => {
  const [selectedOperator, setSelectedOperator] = useState(null);

  const operatorList = [
    { label: 'Tata Sky', value: 'tata_sky' },
    { label: 'Dish TV', value: 'dish_tv' },
    { label: 'Airtel Digital TV', value: 'airtel_tv' },
    { label: 'Sun Direct', value: 'sun_direct' },
  ];

  return (
    <LinearGradient colors={['#0C6B72', '#34AEA1']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.appbarHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={LeftArrow} style={styles.backButtonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DTH Recharge</Text>
          <View style={styles.backButton} />
        </View>

<ScrollView style={{flexGrow:1}}>
<View style={styles.contentContainer}>
          <ImageSlider />

          <Text style={styles.label}>DTH Number</Text>
          <TextInputCustom Title={'Enter DTH Number'} />

          {/* Operator Selection */}
          <Text style={styles.label}>Select DTH Operator</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedOperator(value)}
              items={operatorList}
              placeholder={{
                label: 'Select your DTH Operator...',
                value: null,
              }}
              style={{
                inputIOS: styles.picker, // For iOS
                inputAndroid: styles.picker, // For Android
              }}
              value={selectedOperator}
            />
          </View>

          {selectedOperator && (
            <Text style={styles.selectedText}>
              Selected Operator: {operatorList.find(op => op.value === selectedOperator)?.label}
            </Text>
          )}
        </View>
</ScrollView>

        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DTHScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  backButtonText: {
    height: 20,
    width: 20,
    tintColor: Colors.White,
  },
  headerTitle: {
    color: Colors.White,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  appbarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.Grey,
    marginTop: 20,
  },
  pickerContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 5,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 8,
    color: Colors.textColor,
    paddingRight: 30, // space for the dropdown arrow
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.White,
  },
});
