import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, Container, Content, Body } from "native-base";
import _ from "lodash";
import { Image } from "react-native-elements";
import globalStyles from "../../../styles/global";
import PedidoContext from "../../../context/pedidos/pedidosContext";
import FirebaseContext from "../../../context/firebase/firebaseContext";
import Loading from "../../../components/ui/Loading";
import CarouselPromoLoc from "../../../components/ui/CarouselPromoLoc";
import firebase from "../../../firebase";

const { width } = Dimensions.get("window");

export default function ListaProductos() {
  const { local, seleccionarProducto } = useContext(PedidoContext);
  const { obtenerProductos } = useContext(FirebaseContext);
  //context de firebase
  const [productos, setProductos] = useState(false);

  const [loading, setLoading] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos(local.id);
    consulta();
  }, [local]);
  const consulta = async () => {
    setIndicator(false);
    await firebase.db
      .collection("restaurants")
      .doc(local.id)
      .collection("productos")
      .where("existencia", "==", true)
      .onSnapshot(manejarSnapshot);
  };
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
    setProductos(productos);
    setIndicator(true);
  }

  const mostrarHeading = (categoria, i, imagen, producto) => {
    if (i > 0) {
      const categoriaAnterior = productos[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            // navegar al local seleccionado
            style={{ padding: 7 }}
            onPress={() => {
              //seleccionar el id del local

              seleccionarProducto(producto);
              navigation.navigate("formularioPlatillo", {
                categoria: categoria,
              });
            }}
          >
            <View style={styles.card}>
              <View style={styles.imagen}>
                <Image
                  resizeMode="cover"
                  PlaceholderContent={<ActivityIndicator color="fff" />}
                  source={
                    imagen
                      ? { uri: imagen[0] }
                      : require("../../../../assets/img/noimage.png")
                  }
                  style={{ width: 80, height: 80 }}
                />
              </View>

              <Body>
                <Text style={styles.colorText}>{categoria}</Text>
              </Body>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={{ padding: 7 }}
          // navegar al local seleccionado
          onPress={() => {
            //seleccionar el id del local
            seleccionarProducto(producto);
            navigation.navigate("formularioPlatillo", { categoria: categoria });
          }}
        >
          <View style={styles.card}>
            <View style={styles.imagen}>
              <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="fff" />}
                source={
                  imagen
                    ? { uri: imagen[0] }
                    : require("../../../../assets/img/noimage.png")
                }
                style={{ width: 80, height: 80 }}
              />
            </View>

            <Body>
              <Text style={styles.colorText}>{categoria}</Text>
            </Body>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content>
        <CarouselPromoLoc
          arrayImages={local.promos}
          height={300}
          width={width}
        />
        {/* <Image
          // si la uri no tiene valor muestra la imagen
          source={require("../../../../assets/inicioGeneral/actividad1.jpg")}
        /> */}

        {indicator ? (
          Object.values(productos).map((producto, i) => {
            //console.log(producto);
            const {
              nombre,
              precio,
              categoria,
              descripcion,
              existencia,
              imagen,
            } = producto;
            return (
              <View key={i}>
                {/* {mostrarHeading(categoria, i)} */}
                {mostrarHeading(categoria, i, imagen, producto)}
              </View>
            );
          })
        ) : (
          <ActivityIndicator size="large" color="#fe2241" />
        )}

        <Loading isVisible={loading} text="Cargando..." />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  separador: {},
  imagen: {
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  card: {
    paddingStart: 5,
    paddingTop: 8,
    flexDirection: "row",
    backgroundColor: "#fe2241",
    paddingBottom: 13,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
    borderRadius: 7,
  },
  separadorText: {
    fontSize: 12,
    color: "#fe2241",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  colorText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  textoPrecio: {
    color: "#fe2241",
    fontWeight: "bold",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: -9,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});
