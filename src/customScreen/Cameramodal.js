// npm install react-native-image-picker

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const Cameramodal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const openCamera = () => {
    setLoading(true);
    // launchCamera(
    //   {
    //     mediaType: 'photo',
    //     quality: 1,
    //   },
    //   (response) => {
    //     setLoading(false);
    //     if (response.didCancel) {
    //       console.log('User cancelled camera');
    //     } else if (response.errorCode) {
    //       Alert.alert('Error', response.errorMessage);
    //     } else {
    //       console.log(response.assets[0]); // Handle the selected image
    //     }
    //   }
    // );
  };

  const openGallery = () => {
    setLoading(true);
    // launchImageLibrary(
    //   {
    //     mediaType: 'photo',
    //     quality: 1,
    //   },
    //   (response) => {
    //     setLoading(false);
    //     if (response.didCancel) {
    //       console.log('User cancelled gallery picker');
    //     } else if (response.errorCode) {
    //       Alert.alert('Error', response.errorMessage);
    //     } else {
    //       console.log(response.assets[0]); // Handle the selected image
    //     }
    //   }
    // );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select a Profile Picture</Text>

          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderColor: '#007bff',
    borderWidth:2,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight:'500',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Cameramodal;

