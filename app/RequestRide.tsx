import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 600;

export default function RequestForRentScreen({ navigation }) {
  const [selectedPayment, setSelectedPayment] = useState("visa");
  
  const car = {
    name: "Mustang Shelby GT",
    rating: "4.9",
    reviews: "531 reviews",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  };
  
  const paymentMethods = [
    {
      id: "visa",
      label: "**** **** **** 8970",
      expires: "12/26",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      id: "mastercard",
      label: "**** **** **** 8970",
      expires: "12/26",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
    },
    {
      id: "paypal",
      label: "mailaddress@mail.com",
      expires: "12/26",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png",
    },
    {
      id: "cash",
      label: "Cash",
      expires: "12/26",
      icon: "https://cdn-icons-png.flaticon.com/512/2722/2722226.png",
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
          <Text style={styles.headerTitle}>Request for rent</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Locations */}
          <View style={styles.locationWrapper}>
            <View style={styles.locationItem}>
              <View style={styles.locationIconContainer}>
                <Ionicons name="location" size={20} color="red" />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>Current location</Text>
                <Text style={styles.locationSubtitle}>
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </Text>
              </View>
            </View>
            <View style={styles.locationConnector} />
            <View style={styles.locationItem}>
              <View style={styles.locationIconContainer}>
                <Ionicons name="location" size={20} color="green" />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>Office</Text>
                <Text style={styles.locationSubtitle}>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </Text>
              </View>
              <View style={styles.distanceBadge}>
                <Text style={styles.distance}>1.1km</Text>
              </View>
            </View>
          </View>

          {/* Car Card */}
          <View style={styles.carCard}>
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{car.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {car.rating} ({car.reviews})
                </Text>
              </View>
            </View>
            <View style={styles.carImageContainer}>
              <Image source={{ uri: car.image }} style={styles.carImage} />
            </View>
          </View>

          {/* Date & Time Inputs */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Date" 
              placeholderTextColor="#aaa" 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Time" 
              placeholderTextColor="#aaa" 
            />
          </View>

          {/* Payment Methods */}
          <Text style={styles.sectionTitle}>Select payment method</Text>
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  selectedPayment === method.id && styles.paymentCardSelected,
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentIconContainer}>
                  <Image source={{ uri: method.icon }} style={styles.paymentIcon} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text
                    style={[
                      styles.paymentLabel,
                      selectedPayment !== method.id && { color: "#aaa" },
                    ]}
                  >
                    {method.label}
                  </Text>
                  <Text
                    style={[
                      styles.paymentExpiry,
                      selectedPayment !== method.id && { color: "#ccc" },
                    ]}
                  >
                    Expires: {method.expires}
                  </Text>
                </View>
                {selectedPayment === method.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
    color: "#000",
  },
  headerPlaceholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  locationWrapper: {
    marginBottom: isTablet ? 30 : 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#444",
  },
  locationSubtitle: {
    fontSize: isTablet ? 16 : 14,
    color: "#999",
    marginTop: 2,
  },
  locationConnector: {
    height: 20,
    borderLeftWidth: 2,
    borderColor: "#ddd",
    marginLeft: 15,
  },
  distanceBadge: {
    backgroundColor: "#E9F8F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00A86B",
  },
  distance: {
    fontSize: isTablet ? 16 : 14,
    color: "#00A86B",
    fontWeight: "500",
  },
  carCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E9F8F1",
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 16,
    padding: 16,
    marginBottom: isTablet ? 30 : 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
    color: "#333",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: isTablet ? 16 : 14,
    color: "#666",
  },
  carImageContainer: {
    width: isTablet ? 120 : 100,
    height: isTablet ? 80 : 60,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  carImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  inputContainer: {
    marginBottom: isTablet ? 30 : 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: isTablet ? 18 : 14,
    fontSize: isTablet ? 18 : 16,
    marginBottom: isTablet ? 18 : 12,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: "600",
    color: "#444",
    marginVertical: isTablet ? 18 : 12,
  },
  paymentMethodsContainer: {
    marginBottom: isTablet ? 30 : 20,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: isTablet ? 18 : 14,
    marginBottom: isTablet ? 18 : 12,
    backgroundColor: "#f9f9f9",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentCardSelected: {
    borderColor: "#00A86B",
    backgroundColor: "#E9F8F1",
  },
  paymentIconContainer: {
    width: isTablet ? 50 : 40,
    height: isTablet ? 32 : 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: isTablet ? 16 : 12,
  },
  paymentIcon: {
    width: isTablet ? 40 : 32,
    height: isTablet ? 25 : 20,
    resizeMode: "contain",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#333",
  },
  paymentExpiry: {
    fontSize: isTablet ? 16 : 14,
    color: "#999",
    marginTop: 2,
  },
  selectedIndicator: {
    marginLeft: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: isTablet ? 24 : 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  confirmButton: {
    backgroundColor: "#00A86B",
    borderRadius: 16,
    paddingVertical: isTablet ? 20 : 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: isTablet ? 20 : 18,
    fontWeight: "600",
  },
});