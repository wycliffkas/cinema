import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CustomDropdown = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onSelectItem = item => {
    setSelectedItem(item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>{selectedItem.label}</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          <ScrollView>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => onSelectItem(item)}
              >
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#efefef',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 200,
  },
  dropdownItem: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 14,
  },
});

export default CustomDropdown;
