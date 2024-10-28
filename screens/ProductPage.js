import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductPage = ({ route, navigation }) => {
  const { product } = route.params;
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleAddToCart = () => {
    if (product.inStock) {
      const date = new Date();
      date.setDate(date.getDate() + 3); // 3-day delivery
      setDeliveryDate(date.toDateString());
      Alert.alert('Added to Cart', `Expected Delivery Date: ${date.toDateString()}`);
    } else {
      Alert.alert('Out of Stock', 'This product cannot be added to the cart as it is out of stock.');
    }
  };

  const handleBuyNow = () => {
    if (product.inStock) {
      navigation.navigate('PaymentScreen', { product });
    } else {
      Alert.alert('Out of Stock', 'This product cannot be purchased as it is out of stock.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i5.walmartimages.com/asr/88e642af-7183-48c7-8b9a-872d6abf24a6_1.f9ed6caa72e06acd9d3b04db27227cb6.jpeg" }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product["Product Name"]}</Text>
      <Text style={styles.productPrice}>₹ {product.Price}</Text>

      <View style={styles.badgesContainer}>
        <View style={styles.badge}>
          <Icon name="checkmark-circle" size={16} color="#28a745" />
          <Text style={styles.badgeText}>100% Original</Text>
        </View>
        <View style={styles.badge}>
          <Icon name="checkmark-circle" size={16} color="#28a745" />
          <Text style={styles.badgeText}>Lowest Price</Text>
        </View>
        <View style={styles.badge}>
          <Icon name="checkmark-circle" size={16} color="#28a745" />
          <Text style={styles.badgeText}>Free Shipping</Text>
        </View>
      </View>

      <View style={styles.offerContainer}>
        <Text style={styles.offerText}>Offers:</Text>
        <Text style={styles.offerDetail}>Get free shipping on orders above ₹500</Text>
        <Text style={styles.offerDetail}>Hurry, few left!</Text>
      </View>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Expected Delivery:</Text>
        <Text style={styles.deliveryDate}>{deliveryDate || "Not set"}</Text>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: {product.rating} ({product.reviewsCount} Reviews)</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.cartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.cartButtonText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buyButton, !product.inStock && styles.disabledButton]}
          onPress={handleBuyNow}
          disabled={!product.inStock}
        >
          <Text style={styles.buyButtonText}>Buy it now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 18,
    color: '#28a745',
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  offerContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  offerText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offerDetail: {
    color: '#666',
  },
  deliveryContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  deliveryText: {
    fontWeight: 'bold',
  },
  deliveryDate: {
    color: '#666',
  },
  ratingContainer: {
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#ffcc00',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
});

export default ProductPage;

