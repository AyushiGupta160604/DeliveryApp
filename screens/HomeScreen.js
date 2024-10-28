import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value

  useEffect(() => {
    // Fade in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const startScaling = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 900,
          useNativeDriver: true,
        }),
      ]).start(() => startScaling());
    };

    startScaling(); 

    return () => {

    };
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image
        source={{ uri: 'https://github.com/AyushiGupta160604/DeliveryApp/blob/main/image.png?raw=true' }} // Replace with your image URL
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
      />
      <Text style={styles.title}>Welcome to DeliveryApp</Text>
      <Text style={styles.subtitle}>Find the best products with quick delivery!</Text>
      
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>Select a Product</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  selectButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
