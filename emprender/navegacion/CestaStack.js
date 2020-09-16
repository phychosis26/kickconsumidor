import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cesta from "../views/viewCesta/Cesta";
import Deposito from "../views/viewCesta/Deposito";

const Stack = createStackNavigator();

export default function CestaStack() {
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
        headerTintColor: "#000",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="cestaIn"
        component={Cesta}
        options={{
          title: "Orden",
        }}
      />
      <Stack.Screen
        name="deposito"
        component={Deposito}
        options={{
          title: "Depósito",
        }}
      />
    </Stack.Navigator>
  );
}
