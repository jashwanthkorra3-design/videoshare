import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const isTablet = width >= 600;

export default function BookingSuccessScreen({ navigation }) {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial entrance animation
    Animated.parallel([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Start continuous slow rotation after entrance
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 2,
          duration: 20000, // 20 seconds for a full rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
  }, []);

  const SuccessIcon = () => {
    const rotateInterpolation = rotation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["-180deg", "0deg", "360deg"],
    });

    return (
      <Animated.View style={[
        styles.successIconContainer,
        {
          transform: [{ scale: scale }],
        },
      ]}>
        {/* Background - Rotating */}
        <Animated.View style={[
          styles.iconBackground,
          {
            transform: [{ rotate: rotateInterpolation }],
          },
        ]}>
          <Svg width={124} height={124} viewBox="0 0 124 124">
            <Path
              d="M48.9781 6.74924C55.3273 -2.24974 68.6727 -2.24975 75.0219 6.74924L75.4298 7.32744C78.9766 12.3545 85.1003 14.8911 91.163 13.8443L91.8603 13.724C102.713 11.8503 112.15 21.2869 110.276 32.1397L110.156 32.837C109.109 38.8997 111.645 45.0234 116.673 48.5702L117.251 48.9781C126.25 55.3273 126.25 68.6727 117.251 75.0219L116.673 75.4298C111.645 78.9766 109.109 85.1003 110.156 91.163L110.276 91.8603C112.15 102.713 102.713 112.15 91.8603 110.276L91.163 110.156C85.1003 109.109 78.9766 111.645 75.4298 116.673L75.0219 117.251C68.6727 126.25 55.3273 126.25 48.9781 117.251L48.5702 116.673C45.0234 111.645 38.8997 109.109 32.837 110.156L32.1397 110.276C21.2869 112.15 11.8503 102.713 13.724 91.8603L13.8443 91.163C14.8911 85.1003 12.3545 78.9966 7.32744 75.4298L6.74924 75.0219C-2.24975 68.6727 -2.24975 55.3273 6.74924 48.9781L7.32744 48.5702C12.3545 45.0234 14.8911 38.8997 13.8443 32.837L13.724 32.1397C11.8503 21.2869 21.2869 11.8503 32.1397 13.724L32.837 13.8443C38.8997 14.8911 45.0234 12.3545 48.5702 7.32745L48.9781 6.74924Z"
              fill="#C8E6C9"
            />
          </Svg>
        </Animated.View>
        
        {/* Tick - Stationary */}
        <View style={styles.iconTick}>
          <Svg width={124} height={124} viewBox="0 0 124 124">
            <Path
              d="M84.4734 41.4731C85.9138 40.0329 88.2488 40.033 89.6893 41.4731C91.1297 42.9136 91.1297 45.2495 89.6893 46.6899L53.8563 82.5229C53.2088 83.1738 52.3426 83.5541 51.4324 83.5991L51.2498 83.604H51.2342C50.2526 83.5991 49.3136 83.2059 48.6209 82.5034H48.6199L34.2869 67.9478V67.9468C32.8561 66.4951 32.8774 64.1609 34.326 62.7319L34.327 62.731C35.7758 61.3067 38.1145 61.3188 39.5428 62.771L51.2654 74.6802L84.4734 41.4731Z"
              fill="#43A048"
              stroke="#43A048"
              strokeWidth={2}
            />
          </Svg>
        </View>
      </Animated.View>
    );
  };

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
        </View>

        {/* Content */}
        <View style={styles.content}>
          <SuccessIcon />
          <Text style={styles.title}>Thank you</Text>
          <Text style={styles.subtitle}>
            Your booking has been placed sent to{"\n"}Md. Sharif Ahmed
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Ride</Text>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  successIconContainer: {
    width: 124,
    height: 124,
    marginBottom: isTablet ? 40 : 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 124,
    height: 124,
  },
  iconTick: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 124,
    height: 124,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: isTablet ? 28 : 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: isTablet ? 16 : 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: isTablet ? 20 : 16,
    textAlign: "center",
    color: "#666",
    lineHeight: isTablet ? 28 : 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: isTablet ? 24 : 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  confirmButton: {
    backgroundColor: "#007A3D",
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