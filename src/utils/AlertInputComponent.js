import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity, // Add TouchableOpacity import
} from 'react-native';

const AlertInputComponent = ({
  visible,
  onClose,
  onSubmit,
  initialValue,
  actionPopup,
}) => {
  const [inputText, setInputText] = useState('');
  const [action, setAction] = useState('Hoàn Tất');

  useEffect(() => {
    setInputText(initialValue || ''); // Set initial value when the popup appears
  }, [initialValue]);

  const handleInputChange = text => {
    setInputText(text);
  };

  const handleSubmit = () => {
    onSubmit(inputText); // Send data back to the parent component
    onClose();
  };

  const handleOverlayPress = () => {
    // Handle the overlay press, similar to pressing "Cancel" button
    onClose();
  };

  const placeholderTextStyle =
    inputText.trim() === '' ? styles.placeholderRed : styles.placeholderGray;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity // Add the overlay as a TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleOverlayPress}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Nhập tên biểu mẫu</Text>
          <TextInput
            value={inputText}
            onChangeText={handleInputChange}
            style={styles.input}
            placeholder="Biểu mẫu..."
            placeholderTextColor={placeholderTextStyle.color}
          />
          <View style={styles.buttonContainer}>
            <Button title="Hủy" onPress={onClose} color="#FFBF00" />
            <Button title={action} onPress={handleSubmit} color="#007BFF" />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  placeholderRed: {
    color: 'red',
  },
  placeholderGray: {
    color: '#777',
  },
});

export default AlertInputComponent;
