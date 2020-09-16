import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import PedidoContext from "../../context/pedidos/pedidosContext";
export default function Productos() {
  const { local } = useContext(PedidoContext);
  const { producto } = local;
  const { nombre } = producto;
  return (
    <View>
      <Text>{nombre}</Text>
    </View>
  );
}
