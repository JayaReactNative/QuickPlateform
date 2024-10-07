import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const RelationPickerDialog = ({data, selected, setSelected}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Open the dialog
  const openDialog = () => {
    setIsModalVisible(true);
  };

  // Close the dialog
  const closeDialog = () => {
    setIsModalVisible(false);
  };

  // Handle selection of an item
  const handleSelection = (item) => {
    setSelected(item);
    closeDialog();
  };

  return (
    <View>
      {/* Touchable to Open Dialog */}
      <TouchableOpacity onPress={openDialog} style={styles.selector}>
        <Text>{selected || 'Select Relation'}</Text>
      </TouchableOpacity>

      {/* Modal as a Dialog Box */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeDialog}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Relation</Text>

            {/* FlatList to Show Options */}
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelection(item.value)}>
                  <Text style={{color:'black',fontSize:17 ,fontWeight:'600'}}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Close Button */}
            <TouchableOpacity onPress={closeDialog} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RelationPickerDialog;


const styles = StyleSheet.create({
    selector: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#e2fdfd',
      justifyContent: 'center',
      width:160,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      width: '100%',
      alignItems: 'center',
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#34AEA1',
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  