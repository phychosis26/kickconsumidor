import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

//importar el stack
import CuentaStack from "./emprender/navegacion/CuentaStack";
import MisPedidosStack from "./emprender/navegacion/MisPedidosStack";
import LocalesStack from "./emprender/navegacion/LocalesStack";
import CestaStack from "./emprender/navegacion/CestaStack";

//importar state de context
import FirebaseState from "./emprender/context/firebase/firebaseState";
import PedidoState from "./emprender/context/pedidos/pedidosState";


//solicionar error base 64
import { decode, encode } from "base-64";
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

//ocultar alerta de tiempo
YellowBox.ignoreWarnings(["Setting a timer"]);

const Tab = createBottomTabNavigator();
//navegacion principal de la app
export default function App() {
  const [login, setLogin] = useState(null);
  //consultar si esta logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);


  
  return (
    <FirebaseState>
      <PedidoState>
        <NavigationContainer>
          {/* opciones del contenedor de las screens */}
          <Tab.Navigator
            initialRouteName="localesInit"
            tabBarOptions={{
              inactiveTintColor: login ? "#636162":"#fff",
              activeTintColor: login ? "#fe2241":"#fff",
              inactiveBackgroundColor: "#FFF",
              activeBackgroundColor: "#FFF",
              
            }}
            //mostrar los iconos de la barra
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
            })}
          >
            {/* navegar a las diferentes screens... en este nivel de stack se muestran todos los screens */}
            
            <Tab.Screen
            name="localesInit"
            component={login ? LocalesStack : CuentaStack}
            options={{ title: "Inicio" }}
          />

          <Tab.Screen
            name="misPedidos"
            component={login ? MisPedidosStack : CuentaStack}
            options={{ title: "Mis pedidos" }}
          />
          <Tab.Screen
            name="cesta"
            component={login ? CestaStack : CuentaStack}
            options={{ title: "Ordenes" }}
          />
            {/* <Tab.Screen
              name="top"
              component={TopLocalesStack}
              options={{ title: "Top-10" }}
            /> */}
            <Tab.Screen
              name="cuenta"
              component={CuentaStack}
              options={{title: "Opciones" }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PedidoState>
    </FirebaseState>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "localesInit":
      iconName = "home-outline";
      break;
    case "misPedidos":
      iconName = "star-outline";
      break;
    case "cesta":
      iconName = "cart-outline";
      break;
    case "cuenta":
      iconName = "account-box";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}