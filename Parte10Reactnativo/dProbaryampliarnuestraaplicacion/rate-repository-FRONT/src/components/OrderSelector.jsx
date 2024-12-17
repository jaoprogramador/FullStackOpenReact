/* import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';

const OrderSelector = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#333',
  },
});


export default OrderSelector; */

//VERSION 2 con paper   npm install react-native-paper
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Menu, Button, Divider } from 'react-native-paper';

const OrderSelector = ({ selectedOrder, setSelectedOrder }) => {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  return (
    <View style={{ marginTop: 10 }}>
      <Button onPress={openMenu} mode="contained" style={{ width: 200 }}>
        {selectedOrder === 'latest'
          ? 'Latest repositories'
          : selectedOrder === 'highest'
          ? 'Highest rated repositories'
          : 'Lowest rated repositories'}
      </Button>
      
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Select an item</Button>}
      >
        <Menu.Item onPress={() => { setSelectedOrder('latest'); closeMenu(); }} title="Latest repositories" />
        <Menu.Item onPress={() => { setSelectedOrder('highest'); closeMenu(); }} title="Highest rated repositories" />
        <Menu.Item onPress={() => { setSelectedOrder('lowest'); closeMenu(); }} title="Lowest rated repositories" />
        <Divider />
      </Menu>
    </View>
  );
};

export default OrderSelector;



