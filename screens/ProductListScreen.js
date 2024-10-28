import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import products from '../assets/products.json';
import stock from '../assets/stocks.json';

export default function ProductListScreen({ navigation }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const updatedProducts = products.map(product => {
      const stockInfo = stock.find(s => parseInt(s["Product ID"], 10) === parseInt(product["Product ID"], 10));
      const inStock = stockInfo && stockInfo["Stock Available"].toUpperCase() === "TRUE";
      return { ...product, inStock };
    });
    setProductList(updatedProducts);
  }, []);

  const handleProductSelect = (product) => {
    navigation.navigate('ProductPage', { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Product</Text>
      <FlatList
        data={productList}
        keyExtractor={(item) => item["Product ID"].toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.productCard,
              { backgroundColor: item.inStock ? '#E3FCEF' : '#FFECEC' },
            ]}
            // disabled={!item.inStock}
            onPress={() => handleProductSelect(item)}
          >
            <Text style={styles.productName}>{item["Product Name"]}</Text>
            <Text style={styles.productPrice}>${item.Price.toFixed(2)}</Text>
            <Text style={styles.stockStatus}>
              {item.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  productCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginTop: 8,
  },
});