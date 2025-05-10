import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import styles from "./styles";

// Define a aparência da barra de status como "dark-content"
StatusBar.setBarStyle("dark-content");

// Define áreas do mapa com coordenadas e estilos
const ipaPolygon = {
  coordinates: [
    { latitude: 43.8486744, longitude: -79.0695283 },
    { latitude: 43.8537168, longitude: -79.0700046 },
    { latitude: 43.8518394, longitude: -79.0725697 },
    { latitude: 43.8481651, longitude: -79.0716377 },
    { latitude: 43.8486744, longitude: -79.0695283 },
  ],
  strokeColor: "coral",
  strokeWidth: 4,
};

const stoutPolygon = {
  coordinates: [
    { latitude: 43.8486744, longitude: -79.0693283 },
    { latitude: 43.8517168, longitude: -79.0710046 },
    { latitude: 43.8518394, longitude: -79.0715697 },
    { latitude: 43.8491651, longitude: -79.0716377 },
    { latitude: 43.8486744, longitude: -79.0693283 },
  ],
  strokeColor: "firebrick",
  strokeWidth: 4,
};

export default function PlottingOverlays() {
  const [ipaStyles, setIpaStyles] = useState([styles.ipaText, styles.boldText]);
  const [stoutStyles, setStoutStyles] = useState([styles.stoutText]);
  const [visibleOverlays, setVisibleOverlays] = useState([ipaPolygon]); // Começa com a região IPA

  function onClickIpa() {
    setIpaStyles([styles.ipaText, styles.boldText]);
    setStoutStyles([styles.stoutText]);
    setVisibleOverlays([ipaPolygon]);
  }

  function onClickStout() {
    setStoutStyles([styles.stoutText, styles.boldText]);
    setIpaStyles([styles.ipaText]);
    setVisibleOverlays([stoutPolygon]);
  }

  return (
    <View style={styles.container}>
      {/* Títulos clicáveis */}
      <View>
        <Text style={ipaStyles} onPress={onClickIpa}>IPA Fans</Text>
        <Text style={stoutStyles} onPress={onClickStout}>Stout Fans</Text>
      </View>

      {/* Mapa com polígonos visíveis */}
      <MapView
        style={styles.mapView}
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: 43.8486744,
          longitude: -79.0695283,
          latitudeDelta: 0.002,
          longitudeDelta: 0.04,
        }}
      >
        {visibleOverlays.map((v, i) => (
          <Polygon
            key={i}
            coordinates={v.coordinates}
            strokeColor={v.strokeColor}
            strokeWidth={v.strokeWidth}
          />
        ))}
      </MapView>
    </View>
  );
}
