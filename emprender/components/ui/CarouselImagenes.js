import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import { Image } from "react-native-elements";
import firebase from "../../firebase";
import PedidoContext from "../../context/pedidos/pedidosContext";
import FirebaseContext from "../../context/firebase/firebaseContext";
import Carousel from "react-native-looped-carousel";

const { width, height } = Dimensions.get("window");

const CarouselImagenes = (props) => {
  const { setLoading, menu, navigation, seleccionarLocal, categLoc } = props;
  const { ciudad } = useContext(PedidoContext);
  
  const [data, setData] = useState([]);

  //obteniendo las images
  const consultaimagenes = async () => {
    await firebase.db
      .collection("promociones")
      .where("ciudad", "==", ciudad)
      .where("categoria", "==", categLoc)
      .onSnapshot(manejarSnapshot);
    function manejarSnapshot(snapshot) {
      let ordenes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(ordenes);
      setLoading(false);
    }
  };

  //peticion para consulta
  useEffect( () => {
    consultaimagenes()
  }, []);

  const enviarDatos = (dato) => {
    menu.map((producto, i) => {
      //reestructuring de los locales
      if (producto.id === dato) {
        seleccionarLocal(producto);
        navigation.navigate("listaProductos");
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {data.length === 0 ? (
        <Image
          style={styles.imgae}
          source={require("../../../assets/screen_KUICK/defecto_opt.jpg")}
        />
      ) : (
        <Carousel delay={2000} style={styles.imgae} autoplay>
          {data.map((datos, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => {
                  enviarDatos(datos.idlocal);
                }}
              >
                <Image
                  style={styles.imgae}
                  resizeMode="stretch"
                  PlaceholderContent={<ActivityIndicator color="fff" />}
                  source={{ uri: datos.imagen }}
                />
              </TouchableOpacity>
            );
          })}
        </Carousel>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 3,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  imgae: {
    flex: 1,
    width: width,
    height: height / 2.5,
    // borderWidth: 2,
    // borderColor: "#373737",
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescripcion: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardPadre: {
    backgroundColor: "#fff",
  },
  card: {
    margin: 0,
  },
  title: {
    marginHorizontal: 30,
    marginTop: 10,
  },
});

export default CarouselImagenes;
