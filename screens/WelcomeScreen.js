import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Image
            source={require("../assets/images/tesla.jpg")}
            style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to RideX – Your Journey, Your Way!</Text>
            <Text style={styles.subtitle}>
              Your Ultimate Vehicle Rental Solution! Explore, Rent, and Ride in Style Anytime, Anywhere!
            </Text>

            <View style={styles.progressDots}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <LinearGradient
                  colors={['#DAFF56', '#DAFF56']}
                  style={styles.button}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <Text style={styles.arrows}>{'>>'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop:300,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'

  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 20,
    textAlign: 'center'

  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    width: 24,
    backgroundColor: '#DAFF56',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    marginTop: 200,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  arrows: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
