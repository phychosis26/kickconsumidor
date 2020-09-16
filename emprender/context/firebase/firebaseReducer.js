import {
  OBTERNER_PRODUCTOS_EXITO,
  OBTENER_RESTAURANTES,
  OBTENER_ORDENES,
  OBTENER_FACTURA,
  OBTENER_IMAGENES,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case OBTERNER_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
      };
    case OBTENER_RESTAURANTES:
      return {
        ...state,
        menu: action.payload,
      };
    case OBTENER_ORDENES:
      return {
        ...state,
        ordenes: action.payload,
      };
    case OBTENER_FACTURA:
      return {
        ...state,
        factura: action.payload,
      };
    case OBTENER_IMAGENES:
      return {
        ...state,
        carrouImg: action.payload,
      };

    default:
      return state;
  }
};
