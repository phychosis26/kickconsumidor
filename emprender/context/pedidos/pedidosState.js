import React, { useReducer } from "react";

import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";

import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
  SELECCIONAR_LOCAL,
  REINICIAR_PEDIDO,
  SELECCIONAR_CIUDAD,
  VISIBLE_MODAL,
  OBTENER_TOCKEN
} from "../../types";

const PedidoState = (props) => {
  //crear state inicial
  const initialState = {
    pedido: [],
    producto: null,
    total: 0,
    idPedido: "",
    local:"",
    ciudad:"",
    modal:false,
    tokenState:null
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(PedidoReducer, initialState);
  //seleccionar local
  const seleccionarLocal = (local) => {
    dispatch({
      type: SELECCIONAR_LOCAL,
      payload: local,
    });
  };
  // selecciona el producto
  const seleccionarProducto = (producto) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: producto,
    });
  };
  //Cuando se confirma un pedido
  const guardarPedido = (pedido) => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };
  //muestra el total a pagar
  const mostrarResumen = (total) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };
  //elimina un articulo del carrito
  const eliminarProducto = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };
  //realizar pedido
  const pedidoRealizado = (id) => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };
  //reinicar pedido
  const reiniciar = () => {
    dispatch({
      type: REINICIAR_PEDIDO,
    });
  };
  //selecciona la ciudad
  const seleccionarCiudad = (ciudad) => {
    dispatch({
      type: SELECCIONAR_CIUDAD,
      payload: ciudad,
    });
  };
  //visibiliodaddel modal 
  const setVisibleModal = (visible) =>{
    dispatch({
      type: VISIBLE_MODAL,
      payload: visible,
    });
  }
  const setToken = (tok) =>{
    dispatch({
      type: OBTENER_TOCKEN,
      payload: tok,
    });
  }
  

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        producto: state.producto,
        total: state.total,
        idPedido: state.idPedido,
        local: state.local,
        ciudad: state.ciudad,
        modal:state.modal,
        tokenState:state.tokenState,
        reiniciar,
        seleccionarProducto,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
        seleccionarLocal,
        seleccionarCiudad,
        setVisibleModal,
        setToken
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
