import React, { useEffect, useState, createContext, useReducer } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Modal, Pressable, RefreshControl } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import BottomNavBar from "../components/bottomNavbar";
import { typography } from "../theme/typography";

// Context for managing state
const ClickContext = createContext();

const clickReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "RESET":
      return 0; // Reset the count to 0
    default:
      return state;
  }
};

const HomeScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [state, dispatch] = useReducer(clickReducer, 0);
  const [refreshing, setRefreshing] = useState(false);

  // Access the email passed via route params
  const { email } = route.params || { email: "Guest" }; // Fallback to 'Guest' if no email is passed

  // Fetch vehicles from the custom API
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/c/a9f2-93c8-400a-af3a");
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles.");
      }
      const data = await response.json();
      setVehicles(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to load vehicles. Please try again later.");
      console.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle refresh (on pull to refresh)
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch({ type: "RESET" }); // Reset the count to 0
    await fetchVehicles();
    setRefreshing(false);
  };

  const handleRent = () => {
    dispatch({ type: "INCREMENT" });
    setSelectedVehicle(null); // Close modal
  };

  return (
      <ClickContext.Provider value={{ count: state, dispatch }}>

        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          {/* Welcome Header */}
          <View style={styles.header}>
            <Text style={[styles.title, typography.title, { color: theme.colors.textNew, textAlign: "center" }]}>
              {email && `Welcome, ${email}`}
            </Text>
            <Text style={[styles.subtitle, typography.body, { color: theme.colors.textNew2, textAlign: "center" }]}>
              Rent your dream vehicles with RentX!
            </Text>
          </View>

          {/* Vehicle List */}
          {loading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
          ) : (
              <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                {vehicles.map((vehicle, index) => (
                    <TouchableOpacity
                        key={vehicle.id || index}  // Fallback to index if vehicle.id is missing or not unique
                        style={styles.card}
                        onPress={() => setSelectedVehicle(vehicle)}
                    >
                      <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
                      <View style={styles.cardContent}>
                        <Text style={[styles.vehicleName, { color: theme.colors.textPrimary }]}>{vehicle.name}</Text>
                        <Text style={[styles.vehicleNumber, { color: theme.colors.textSecondary }]}>
                          {vehicle.vehicleNumber}
                        </Text>
                        <Text style={[styles.vehicleDescription, { color: theme.colors.textSecondary }]}>
                          {vehicle.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                ))}
              </ScrollView>
          )}

          {/* Rent Confirmation Modal */}
          {selectedVehicle && (
              <Modal transparent={true} animationType="slide" visible={!!selectedVehicle}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Image source={{ uri: selectedVehicle.image }} style={styles.modalVehicleImage} />
                    <Text style={styles.modalText}>
                      Do you want to rent {selectedVehicle.name}?
                    </Text>
                    <Pressable style={styles.modalButton} onPress={handleRent}>
                      <Text style={styles.modalButtonText}>Rent</Text>
                    </Pressable>
                    <Pressable style={styles.modalButton} onPress={() => setSelectedVehicle(null)}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
          )}

          {/* Floating Button */}
          <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.floatingButtonText}>Clicks: {state}</Text>
          </TouchableOpacity>

          {/* Bottom Navigation Bar */}
          <BottomNavBar />
        </View>
      </ClickContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAFF56",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "500",
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vehicleNumber: {
    fontSize: 14,
    marginVertical: 5,
  },
  vehicleDescription: {
    fontSize: 12,
  },
  floatingButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#DAFF56",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalVehicleImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#DAFF56",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default HomeScreen;
