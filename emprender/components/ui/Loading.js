import React from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Text } from "react-native-elements";
import { Overlay } from "react-native-elements";

// Indicador  overlay de " pantalla - cargando"
export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.6)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <>
        {text === "Registrando..." ? (
          <Image
            source={require("../../../assets/Kuick/kuik_loading/GraciasporPreferirnos-min.png")}
            resizeMode="contain"
            style={styles.imagen}
          />
        ) : (
          <Image
            source={require("../../../assets/Kuick/kuik_loading/bienvenida-min.png")}
            resizeMode="contain"
            style={styles.imagen}
          />
        )}

        <View style={styles.view}>
          <ActivityIndicator size="large" color="#fe2241" />
          {/*   renderizar el texto si llega, si no , no lo muestra*/}
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: "80%",
  },
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
    borderColor: "#fe2241",
    borderWidth: 2,
    borderRadius: 15,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fe2241",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
