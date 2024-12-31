import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { typography } from "../theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import SignupScreen from "./SignupScreen"; // Import required components

const LoginScreen = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = () => {
    let isValid = true;

    // Validate Email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long and contain both letters and numbers.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If all fields are valid, proceed with navigation
    if (isValid) {
      navigation.navigate("HomeScreen", { email: email });
    }

  };

  const handleGestureEvent = (event) => {
    // Detect swipe right gesture (translationX > 100)
    if (event.nativeEvent.translationX > 100) {
      navigation.navigate("WelcomeScreen"); // Navigate to WelcomeScreen when swipe right
    }
  };

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <View style={styles.container}>
            <Image source={require("../assets/images/toyota.jpg")} style={styles.backgroundImage} />
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={[styles.title, typography.title, { color: "#fff" }]}>
                  Welcome Back
                </Text>
                <Text style={[styles.subtitle, typography.body, { color: "#E0E0E0" }]}>
                  Please sign in to continue
                </Text>

                <Text style={[styles.inputLabel, typography.body, { color: "#fff" }]}>Email</Text>
                <TextInput
                    style={[
                      styles.input,
                      typography.input,
                      { backgroundColor: theme.colors.inputBackground },
                    ]}
                    placeholder="Enter your Email"
                    placeholderTextColor={theme.colors.placeholder}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <Text style={[styles.inputLabel, typography.body, { color: "#fff" }]}>Password</Text>
                <TextInput
                    style={[
                      styles.input,
                      typography.input,
                      { backgroundColor: theme.colors.inputBackground, color: theme.colors.text },
                    ]}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.placeholder}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <LinearGradient colors={["#DAFF56", "#DAFF56"]} style={styles.buttonGradient}>
                    <Text style={[styles.buttonText, typography.smallText, { color: "black" }]}>
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={[styles.footerText, typography.smallText, { color: "#E0E0E0" }]}>
                  Don't have an account?{" "}
                  <Text style={[styles.linkText, typography.smallText, { color: "#DAFF56" }]} onPress={() => navigation.navigate("SignupScreen")}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E0E0",
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    textAlign: "left",
    width: "90%",
    marginBottom: 5,
  },
  input: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "left",
    width: "90%",
    marginBottom: 15,
  },
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#E0E0E0",
  },
  linkText: {
    fontWeight: "bold",
    color: "#DAFF56",
  },
});

export default LoginScreen;
