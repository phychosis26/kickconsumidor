import React,{useState,useEffect} from "react";
import {Platform} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Locales from "../views/viewsLocales/Locales";
import ListaProductos from "../views/viewsLocales/viewsPedido/ListaProductos";
import FormularioPlatillo from "../views/viewsLocales/viewsPedido/FormularioPlatillo";
import PrincipalGeneral from "../views/PrincipalGeneral";
import ProgresoPedido from "../views/viewsLocales/viewsPedido/ProgresoPedido";
import ListaConsumidor from "../views/viewsLocales/ListaConsumidor";
import LocalesProveedor from "../views/viewsLocales/LocalesProveedor";
import EscogeCiudad from "../views/EscogeCiudad";
import Buscar from "../views/Buscar";

const Stack = createStackNavigator();

export default function LocalesStack() {
  const [android, setAndroid] = useState(false);
  useEffect(() => {
    if (Platform.OS !== 'android') {
      setAndroid(true)
    }
  }, []);

  
  return (
    <Stack.Navigator
      // opciones de la barra superior
      
      screenOptions={{
        headerShown: android,
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
      initialRouteName="ciudad"
    >
      <Stack.Screen
        name="ciudad"
        component={EscogeCiudad}
        options={{ title: "Ciudad" }}
      />
      <Stack.Screen
        name="principalG"
        component={PrincipalGeneral}
        options={{ title: "Principal" }}
      />
      <Stack.Screen
        name="listaConsumidores"
        component={ListaConsumidor}
        options={{ title: "Consumidor" }}
      />
      <Stack.Screen
        name="locales"
        component={Locales}
        options={{ title: "Locales" }}
      />
      
      <Stack.Screen
        name="listaProductos"
        component={ListaProductos}
        options={{
          title: "Lista de Productos",
          // headerRight: (props) => <BotonResumen />,
        }}
      />
      <Stack.Screen
        name="formularioPlatillo"
        component={FormularioPlatillo}
        options={{ title: "Formulario orden" }}
      />
      <Stack.Screen
        name="progresoPedido"
        component={ProgresoPedido}
        options={{ title: "Progres" }}
      />

      <Stack.Screen
        name="Search"
        component={Buscar}
        options={{ title: "Buscador" }}
      />
      <Stack.Screen
        name="localesProveedor"
        component={LocalesProveedor}
        options={{ title: "Proveedor" }}
      />
    </Stack.Navigator>
  );
}
