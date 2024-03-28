import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapsStyle from "../style/MapsStyle";

const INITIAL_LATITUDE = 65.08;
const INITIAL_LONGITUDE = 25.48;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

const Maps = ({ initialLatitude, initialLongitude }) => {
  const [latitude, setLatitude] = useState(initialLatitude || INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(
    initialLongitude || INITIAL_LONGITUDE
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== "granted") {
          setIsLoading(false);
          console.log("Geolocation failed");
          return;
        }
        const location = await Location.getLastKnownPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={MapsStyle.container}>
        <Text>Retrieving location...</Text>
      </View>
    );
  } else {
    return (
      <View style={MapsStyle.container}>
        <MapView
          style={MapsStyle.map}
          initialRegion={{
            latitude: initialLatitude || INITIAL_LATITUDE,
            longitude: initialLongitude || INITIAL_LONGITUDE,
            latitudeDelta: INITIAL_LATITUDE_DELTA,
            longitudeDelta: INITIAL_LONGITUDE_DELTA,
          }}
        >
          <Marker
            title="Testing"
            coordinate={{ latitude: latitude, longitude: longitude }}
          />
        </MapView>
      </View>
    );
  }
};

export default Maps;
