import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Buscar from "../views/Buscar";

const Stack = createStackNavigator();

export default function BuscadorStack() {
  return (
    <Stack.Navigator
      // opciones de la barra superior
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFDA00",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#0E3553",
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="Search"
        component={Buscar}
        options={{ title: "Buscador" }}
      />
    </Stack.Navigator>
  );
}
