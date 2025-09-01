import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 600;

export default function CarDetailScreen({ navigation }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const car = {
    name: "Mustang Shelby GT",
    rating: "4.9",
    reviews: "531 reviews",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555212697-194d092e3b6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580273916550-e3bdbeff3846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1549399542-7e242f5c2a81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    ],
    specifications: [
      { label: "Max. power", value: "2500hp", icon: "flash" },
      { label: "Fuel", value: "10km per litre", icon: "gas" },
      { label: "Max. speed", value: "230kph", icon: "speedometer" },
      { label: "0-60mph", value: "2.5sec", icon: "timer" },
    ],
    features: [
      { label: "Model", value: "GT5000" },
      { label: "Capacity", value: "760hp" },
      { label: "Color", value: "Red" },
      { label: "Fuel type", value: "Octane" },
      { label: "Gear type", value: "Automatic" },
    ],
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carImage} />
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {car.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            { opacity: index === activeImageIndex ? 1 : 0.5 },
          ]}
        />
      ))}
    </View>
  );

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

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Car Title */}
          <Text style={styles.carName}>{car.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>
              {car.rating} ({car.reviews})
            </Text>
          </View>

          {/* Car Image Slider */}
          <View style={styles.imageContainer}>
            <FlatList
              data={car.images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
                );
                setActiveImageIndex(index);
              }}
            />
            {renderPagination()}
          </View>

          {/* Specifications */}
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specRow}>
            {car.specifications.map((spec, index) => (
              <View key={index} style={styles.specCard}>
                <Ionicons name={spec.icon} size={22} color="#00A86B" />
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>

          {/* Car Features */}
          <Text style={styles.sectionTitle}>Car features</Text>
          {car.features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureLabel}>{feature.label}</Text>
              <Text style={styles.featureValue}>{feature.value}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Book later</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fillButton}>
            <Text style={styles.fillButtonText}>Ride Now</Text>
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
  carName: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: "700",
    color: "#444",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: isTablet ? 18 : 16,
    color: "#777",
    marginLeft: 6,
  },
  imageContainer: {
    marginBottom: 24,
    position: "relative",
  },
  carImage: {
    width: width - 32,
    height: isTablet ? 250 : 200,
    resizeMode: "cover",
    borderRadius: 12,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00A86B",
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: isTablet ? 22 : 20,
    fontWeight: "700",
    color: "#444",
    marginBottom: 12,
  },
  specRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  specCard: {
    width: isTablet ? "48%" : "47%",
    backgroundColor: "#E9F8F1",
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  specLabel: {
    fontSize: isTablet ? 16 : 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  specValue: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  featureCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E9F8F1",
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureLabel: {
    fontSize: isTablet ? 18 : 16,
    color: "#555",
  },
  featureValue: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 12,
    paddingVertical: 16,
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
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
    alignItems: "center",
  },
  fillButtonText: {
    color: "#fff",
    fontSize: isTablet ? 18 : 16,
    fontWeight: "600",
  },
});