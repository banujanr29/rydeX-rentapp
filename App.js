import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./theme/ThemeProvider"; // Custom provider for themes
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="WelcomeScreen"
          >
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: 'horizontal', // This enables horizontal swipe
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                options={{headerShown: false,
                gestureEnabled: false,}}
            >
              {(props) => <HomeScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{
                  headerShown: false
            }} />

          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
  );
}
