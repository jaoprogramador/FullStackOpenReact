import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ReviewItem from '../components/ReviewItem'; // Componente para mostrar una revisión individual

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = ({ reviews, onEndReach }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
      // Llama a `onEndReach` cuando el usuario llegue cerca del final de la lista
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5} // Ajusta el umbral para disparar la carga (50% del final)
    />
  );
};

export default ReviewList;
