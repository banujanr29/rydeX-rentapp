import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { typography } from "../theme/typography";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        if (!name) newErrors.name = "Name is required.";

        // Email Validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        // Password Validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter.";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = () => {
        if (validateForm()) {
            // Add sign-up logic here (e.g., API call)
            console.log("Sign Up Successful");
            Alert.alert(
                "Success",
                "Your account has been created!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("LoginScreen") // Navigate to LoginScreen after pressing OK
                    }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert("Error", "Please fill in all the fields correctly.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                {/* Background Image */}
                <Image
                    source={require("../assets/images/hummer.jpg")}
                    style={styles.backgroundImage}
                />
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        {/* Title */}
                        <Text style={[styles.title, typography.title, { color: "#fff" }]}>Create an Account</Text>

                        {/* Name Input */}
                        <Text style={[styles.inputLabel, typography.body, { color: "#fff" }]}>Name</Text>
                        <TextInput
                            style={[styles.input, typography.input, { backgroundColor: theme.colors.inputBackground }]}
                            placeholder="Enter your Name"
                            placeholderTextColor={theme.colors.placeholder}
                            value={name}
                            onChangeText={setName}
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        {/* Email Input */}
                        <Text style={[styles.inputLabel, typography.body, { color: "#fff" }]}>Email</Text>
                        <TextInput
                            style={[styles.input, typography.input, { backgroundColor: theme.colors.inputBackground }]}
                            placeholder="Enter your Email"
                            placeholderTextColor={theme.colors.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        {/* Password Input */}
                        <Text style={[styles.inputLabel, typography.body, { color: "#fff" }]}>Password</Text>
                        <TextInput
                            style={[styles.input, typography.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.text }]}
                            placeholder="Create a Password"
                            placeholderTextColor={theme.colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        {/* Sign Up Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <LinearGradient colors={["#DAFF56", "#DAFF56"]} style={styles.buttonGradient}>
                                <Text style={[styles.buttonText, typography.smallText, { color: "black" }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Log In Link */}
                        <Text style={[styles.footerText, typography.smallText, { color: "#E0E0E0" }]}>
                            Already have an account?{" "}
                            <Text style={[styles.linkText, typography.smallText, { color: "#DAFF56" }]} onPress={() => navigation.navigate("LoginScreen")}>
                                Log In
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        borderRadius: 25,  // Updated to match button curvature
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

export default SignUpScreen;
