import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MisPedidos from "../views/viewMisPedidos/MisPedidos";
import ReviewLocal from "../components/pedido/ReviewLocal";

const Stack = createStackNavigator();

export default function MisPedidosStack() {
  return (
    <Stack.Navigator
      // opciones de la barra superior
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fe2241",
        },
        headerTitleAlign: "center",
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="favorites"
        component={MisPedidos}
        options={{ title: "Mis Pedidos" }}
      />
      <Stack.Screen
        name="add-review-local"
        component={ReviewLocal}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}
