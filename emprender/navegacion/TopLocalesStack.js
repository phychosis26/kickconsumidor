import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopLocales from "../views/TopLocales";

const Stack = createStackNavigator();

export default function TopLocalesStack() {
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
        name="top-restaurants"
        component={TopLocales}
        options={{ title: "Los mejores Locales" }}
      />
    </Stack.Navigator>
  );
}
