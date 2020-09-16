import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favoritos from "../views/Favoritos";

const Stack = createStackNavigator();

export default function FavoritoStack() {
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
        name="favorites"
        component={Favoritos}
        options={{ title: "Restaurantes Favoritos" }}
      />
    </Stack.Navigator>
  );
}
