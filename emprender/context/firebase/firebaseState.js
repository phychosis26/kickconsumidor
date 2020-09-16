import React, { useReducer } from "react";

import firebase from "../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
//types
import {
  OBTENER_RESTAURANTES,
  OBTENER_FACTURA,
  OBTERNER_PRODUCTOS_EXITO,
  OBTENER_ORDENES,
  OBTENER_IMAGENES
} from "../../types";

import _ from "lodash";
import { or } from "react-native-reanimated";

const FirebaseState = (props) => {
  //crear state inicial
  const initialState = {
    menu: [],
    menuChild: [],
    ordenes: [],
    productos: [],
    factura: [],
    carrouImg:[]
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //funcion que ejecuta para traer los productos
  const obtenerProductos = async (id) => {
    //consultar firebase
    await firebase.db
      .collection("restaurants")
      .doc(id)
      .collection("productos")
      .where("existencia", "==", true)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let productos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //ordenar los productos
      productos = _.sortBy(productos, "categoria");
      //resultados
      dispatch({
        type: OBTERNER_PRODUCTOS_EXITO,
        payload: productos,
      });
    }
  };
  const obtenerRestaurantes = (ciudad) => {
    firebase.db
      .collection("restaurants")
      .where("ciudad", "==", ciudad)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let restaurantes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //ordenar los restaurantes
      restaurantes = _.sortBy(restaurantes, "categoria");
      dispatch({
        type: OBTENER_RESTAURANTES,
        payload: restaurantes,
      });
    }
  };

  const obtenerOrdenes = (uid) => {
    firebase.db
      .collection("ordenes")
      .where("usuario", "==", uid)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let ordenes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //ordenar los restaurantes
      ordenes = _.sortBy(ordenes, "creado");
      dispatch({
        type: OBTENER_ORDENES,
        payload: ordenes,
      });
    }
  };
  const obtenerFactura = (numero) => {
    firebase.db
      .collection("usuarios")
      .where("numero", "==", numero)
      .where("estado", "==", true)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let fac = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //ordenar los restaurantes
      dispatch({
        type: OBTENER_FACTURA,
        payload: fac,
      });
    }
  };
  const consultaimagenes = async (ciudad,categoria) => {
    await firebase.db
      .collection("promociones")
      .where("ciudad", "==", ciudad)
      .where("categoria", "==", categoria)
      .onSnapshot(manejarSnapshot);
    function manejarSnapshot(snapshot) {
      let ordenes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch({
        type: OBTENER_IMAGENES,
        payload: ordenes,
      });
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        menuChild: state.menuChild,
        ordenes: state.ordenes,
        productos: state.productos,
        factura: state.factura,
        carrouImg: state.carrouImg,
        firebase,
        obtenerProductos,
        obtenerRestaurantes,
        obtenerOrdenes,
        obtenerFactura,
        consultaimagenes
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
