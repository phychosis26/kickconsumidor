import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cuenta from "../views/ViewsCuenta/Cuenta";
import PedidosGeneral from "../views/viewMisPedidos/PedidosGeneral";

import Mapa from "../views/ViewsCuenta/Mapa";
import Factura from "../views/ViewsCuenta/Factura";

const Stack = createStackNavigator();
export default function CuentaStack() {
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
        headerTintColor: "#CB1F37",
        headerTitleAlign: "center",
      }}
    >
      {/* en este nivel de stack se presenta solo el primer screen y los demas se comportan de manera invisible por lo cual solo se mostrara Account */}
      <Stack.Screen
        name="cuenta"
        component={Cuenta}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name="pedidog"
        component={PedidosGeneral}
        options={{ title: "Mi Pedidos" }}
      />
      <Stack.Screen name="mapa" component={Mapa} options={{ title: "Mapa" }} />
      <Stack.Screen
        name="factura"
        component={Factura}
        options={{ title: "Datos de la Factura" }}
      />
      
    </Stack.Navigator>
  );
}
