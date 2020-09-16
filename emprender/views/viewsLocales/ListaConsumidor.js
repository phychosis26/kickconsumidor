import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import _ from "lodash";
import Loading from "../../components/ui/Loading";
import firebase from "../../firebase";

export default function ListaConsumidor() {
  const navigation = useNavigation();
  //loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  const [data, setData] = useState([]);
  //peticion para consulta
  useEffect(() => {
    consultaimagenes();
  });
  const consultaimagenes = async () => {
    await firebase.db
      .collection("categoriasconsumidor")
      .onSnapshot(manejarSnapshot);
    function manejarSnapshot(snapshot) {
      let ordenes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      ordenes = _.sortBy(ordenes, "num");
      setData(ordenes);
      setIsVisibleLoading(false);
    }

    // console.log(data);
  };
  //alerta de recuerda
  const listaConsumidor = () => {
    return (
      <>
        {data.map((categorias, i) => {
          //reestructuring de los locales
          if (categorias.cat !== "proveedor") {
            return (
              <View style={styles.listadoItem} key={i}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate("locales", {
                      categoria: categorias.cat,
                      subcat: categorias.subcat,
                    });
                  }}
                >
                  <View>
                    <Image
                      style={styles.categ}
                      source={{ uri: categorias.imagen }}
                    />
                  </View>
                  {/* <Text style={styles.textoImagen}>{categorias.key}</Text> */}
                </TouchableOpacity>
              </View>
            );
          }
        })}
        <Loading isVisible={isVisibleLoading} text="Cargando..." />
      </>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/screen_KUICK/fondo_opt.jpg")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ScrollView>
        <View style={styles.listado}>{listaConsumidor()}</View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  botonBaner: {
    marginTop: 20,
  },
  contenedorImg: {
    alignItems: "center",
  },
  bodyList: {
    paddingStart: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 20,
    paddingBottom: 10,
  },
  item: {
    paddingTop: 15,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  desti: {
    width: "100%",
    height: "90%",
  },
  categ: {
    width: "100%",
    height: 210,
    marginVertical: 7,
    borderRadius: 30,
  },
  banner: {
    height: 250,
    flex: 1,
  },
  ciudad: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
  },

  listado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "8%",
    paddingHorizontal: 12,
  },
  listadoItem: {
    flexBasis: "47%",
    justifyContent: "center",
  },
  shadow: {
    borderRadius: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 20,
  },
  textoImagen: {
    position: "absolute",
    bottom: 0,
    top: 15,
    left: 10,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#000",
    borderRadius: 2,
    fontSize: 18,
  },
});
