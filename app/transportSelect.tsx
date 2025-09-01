import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 600;

export default function TransportScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Select transport</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select your transport</Text>
        </View>

        {/* Transport Options */}
        <View style={styles.contentContainer}>
          <View style={styles.grid}>
            {[
              { label: "Car", uri: "https://cdn-icons-png.flaticon.com/512/743/743131.png" },
              { label: "Bike", uri: "https://cdn-icons-png.flaticon.com/512/1048/1048311.png" },
              { label: "Cycle", uri: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png" },
              { label: "Taxi", uri: "https://cdn-icons-png.flaticon.com/512/1532/1532688.png" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <Image source={{ uri: item.uri }} style={styles.icon} />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    marginBottom: 20,
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
    textAlign: "center",
    flex: 1,
  },
  placeholder: {
    width: 60,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: isTablet ? 40 : 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: isTablet ? 26 : 22,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: isTablet ? 40 : 16,
    paddingBottom: isTablet ? 40 : 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: isTablet ? "48%" : "47%",
    aspectRatio: 1,
    backgroundColor: "#F1FBF8",
    borderWidth: 1.5,
    borderColor: "#00A86B",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: isTablet ? 30 : 20,
    marginBottom: isTablet ? 24 : 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: "60%",
    height: "60%",
    marginBottom: isTablet ? 16 : 12,
    resizeMode: "contain",
  },
  label: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "500",
    color: "#444",
    textAlign: "center",
    marginTop: isTablet ? 12 : 8,
  },
});