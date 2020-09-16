import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text } from "native-base";
//estilos
import globalStyles from "../../styles/global";
//importarhook de navigation
import { useNavigation } from "@react-navigation/native";

export default function NuevoPedido() {
  const navigation = useNavigation();
  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <Button
          style={globalStyles.boton}
          rounded
          block
          onPress={() => navigation.navigate("nuevoPedido")}
        >
          <Text style={globalStyles.botonTexto}> Crear nueva orden </Text>
        </Button>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
