import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 600;

export default function CarListScreen({ navigation }) {
  const cars = [
    {
      id: 1,
      name: "BMW Cabrio",
      type: "Automatic | 3 seats | Octane",
      distance: "800m (5mins away)",
      image: "https://cdn-icons-png.flaticon.com/512/743/743131.png",
    },
    {
      id: 2,
      name: "BMW Cabrio",
      type: "Automatic | 3 seats | Octane",
      distance: "800m (5mins away)",
      image: "https://cdn-icons-png.flaticon.com/512/743/743131.png",
    },
    {
      id: 3,
      name: "BMW Cabrio",
      type: "Automatic | 3 seats | Octane",
      distance: "800m (5mins away)",
      image: "https://cdn-icons-png.flaticon.com/512/743/743131.png",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status Bar Spacer for Android */}
      {Platform.OS === 'android' && <View style={styles.statusBarSpacer} />}
      
      {/* Main Content Container */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
          >
            <Ionicons name="chevron-back" size={22} color="#000" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Available cars for ride</Text>
          <Text style={styles.subTitle}>18 cars found</Text>
        </View>

        {/* Car List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {cars.map((car) => (
            <View key={car.id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{car.name}</Text>
                  <Text style={styles.carType}>{car.type}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#000" />
                    <Text style={styles.distance}>{car.distance}</Text>
                  </View>
                </View>
                <Image source={{ uri: car.image }} style={styles.carImage} />
              </View>
              
              {/* Buttons Row */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>Book later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fillButton}>
                  <Text style={styles.fillButtonText}>Ride Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarSpacer: {
    height: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 4,
  },
  headerPlaceholder: {
    width: 60,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: "700",
    color: "#444",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: isTablet ? 18 : 16,
    color: "#bbb",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#E9F8F1",
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  carType: {
    fontSize: isTablet ? 16 : 14,
    color: "#aaa",
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontSize: isTablet ? 16 : 14,
    color: "#333",
    marginLeft: 6,
  },
  carImage: {
    width: isTablet ? 120 : 100,
    height: isTablet ? 84 : 70,
    resizeMode: "contain",
    marginLeft: 15,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#00A86B",
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
  },
  fillButton: {
    flex: 1,
    backgroundColor: "#00A86B",
    borderRadius: 10,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  fillButtonText: {
    color: "#fff",
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
  },
});