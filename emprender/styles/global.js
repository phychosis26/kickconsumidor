import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  //imagen de fondo:
  imagenFondoUp: {
    width: "100%",
    height: 30,
  },
  imagenFondoDown: {
    width: "100%",
    height: 30,
  },
  //contenedor userGuest
  contenedor: {
    flex: 1,
  },
  //color de fondo del los botones
  boton: {
    backgroundColor: "#fe2241",
  },
  //texto que va dentro del boton
  botonTexto: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFF",
  },
  //contenido flex para hacerlo que crezca
  contenido: {
    marginHorizontal: "2.5%",
    flex: 1,
  },
  //centrar contenido
  centrar: {
    flexDirection: "column",
    justifyContent: "center",
  },
  inputFrom: {
    width: "100%",
    marginTop: 20,
  },

  contenido: {
    marginHorizontal: "2.5%",
    flex: 1,
  },

  titulo: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  imagen: {
    height: 300,
    width: "100%",
  },
  cantidad: {
    marginVertical: 5,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  //DetallePlatillo
  imagenDetalleOrden: {
    height: 100,
    width: 100,
  },
  //DetallePlatillo
  bodyD: {
    justifyContent: "center",
    alignItems: "center",
  },
  //UserGuest
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  //userGuest
  image: {
    height: 230,
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  imagenBuscador: {
    width: "100%",
    height: 500,
  },
  //userGuest
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  //userGuest
  description: {
    textAlign: "center",
  },
  //userGuest
  btnStyle: {
    backgroundColor: "#0E3553",
  },
  //userGuest
  btnContainer: {
    marginTop: 20,
    width: "60%",
    backgroundColor: "#fe2241",
  },
  //userGuest
  viewBnt: {
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 80,
    marginTop: 40,
  },
  //userGuest
  textRegister: {
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 13,
  },
  //userGuest
  lastRegister: { fontWeight: "bold" },
  //login
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  //login - codigo
  tittleCodigo: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  ////////////////////////////////////////////
  viewBody2: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});

export default globalStyles;
