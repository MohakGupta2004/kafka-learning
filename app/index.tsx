
import { Button, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";
import { Text } from "@react-navigation/elements";

export default function Index() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
    timestamp: 0,
  });

  const handleSendLocation = async () => {
    if (status?.granted) {
      try {
        const { status: permissionStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (permissionStatus !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:", currentLocation);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    } else {
      requestPermission(); // Triggers the permissions prompt
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Send location" onPress={handleSendLocation} />
      <Text>
        lat: {location && location.coords.latitude}
        {"\n"}
        long: {location && location.coords.longitude}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

