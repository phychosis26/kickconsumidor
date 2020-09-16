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
  OBTENER_TOCKEN,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_LOCAL:
      return {
        ...state,
        local: action.payload,
      };
    case SELECCIONAR_CIUDAD:
      return {
        ...state,
        ciudad: action.payload,
      };
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        producto: action.payload,
      };
    case CONFIRMAR_ORDENAR_PLATILLO:
      return {
        ...state,
        pedido: [...state.pedido, action.payload],
      };
    case MOSTRAR_RESUMEN:
      return {
        ...state,
        total: action.payload,
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        pedido: state.pedido.filter(
          (articulo) => articulo.id !== action.payload
        ),
      };
    case PEDIDO_ORDENADO:
      return {
        ...state,
        pedido: [],
        total: 0,
        idPedido: action.payload,
      };
    case REINICIAR_PEDIDO:
      return {
        ...state,
        pedido: [],
        total: 0,
      };
    case VISIBLE_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case OBTENER_TOCKEN:
      return {
        ...state,
        tokenState: action.payload,
      };

    default:
      return state;
  }
};
