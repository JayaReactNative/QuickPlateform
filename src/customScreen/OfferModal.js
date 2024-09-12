import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
} from 'react-native';

const OfferModal = ({isVisible, onClose, onGoIt}) => {
  return (
    <Modal  
    visible={isVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={()=>onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.message}>
            Hurry up! Special offer just for you.</Text>
          <Button title="Go It" onPress={onGoIt} color="#007BFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    alignSelf: 'center',
    width: '80%',
    height: '20%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    color: 'gray',
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default OfferModal;
