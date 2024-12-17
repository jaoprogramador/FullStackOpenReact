import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ExtraTab1 = ({ data }) => {
  // Encabezados de la tabla
  const headers = ["Columna 1", "Columna 2", "Columna 3"];

  return (
    <View style={styles.container}>
      {/* Renderizar encabezados */}
      <View style={styles.row}>
        {headers.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.headerCell]}>
            {header}
          </Text>
        ))}
      </View>

      {/* Renderizar filas */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.col1}</Text>
            <Text style={styles.cell}>{item.col2}</Text>
            <Text style={styles.cell}>{item.col3}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
  },
});

export default ExtraTab1;
