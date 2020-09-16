import React, { useState, useRef, useContext, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-easy-toast";
import PedidoContext from "../context/pedidos/pedidosContext";
import firebase from "../firebase";
import { ProgressDialog } from "react-native-simple-dialogs";

export default function EscogeCiudad(props) {
  const toastRef = useRef();
  const [selectCiudad, setSelectCiudad] = useState("");
  const navigation = useNavigation();
  const { seleccionarCiudad } = useContext(PedidoContext);

  const [arrCiudades, setArrCiudades] = useState([]);
  const [progressD, setProgressD] = useState(false);

  useEffect(() => {
    consultaCiudad();
  }, []);

  const consultaCiudad = async () => {
    setProgressD(true);
    await firebase.db.collection("ciudades").onSnapshot(manejarSnapshot);
    function manejarSnapshot(snapshot) {
      let ciudades = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      setArrCiudades(ciudades);
      setProgressD(false);
    }

    // console.log(data);
  };

  const seleccion = () => {
    if (!selectCiudad) {
      toastRef.current.show("Debe escoger una ciudad");
    } else {
      seleccionarCiudad(selectCiudad);
      navigation.navigate("principalG");
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/screen_KUICK/fondo_opt.jpg")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ marginTop: "8%" }}>
        <View></View>
        <View style={styles.restaurantCard}>
          <View style={styles.cardRestaurant}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Ciudad en la que se encuentra
            </Text>
            <View style={styles.dropCiudades}>
              <DropDownPicker
                placeholder="Escoja una ciudad"
                items={arrCiudades}
                //defaultValue={ciudad}
                containerStyle={{ height: 50 }}
                style={{ backgroundColor: "#fafafa", position: "absolute" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => setSelectCiudad(item.value)}
              />
              <Button
                containerStyle={{
                  backgroundColor: "red",
                  marginTop: 50,
                }}
                onPress={() => {
                  seleccion();
                }}
                title="Ingresar"
              />
            </View>
          </View>
        </View>
      </View>
      <ProgressDialog
        visible={progressD}
        title="Cargando ciudad"
        message="Espere por favor..."
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  dropCiudades: {
    width: 220,
  },
  restaurantCard: {
    borderRadius: 15,
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    paddingBottom: 10,
    marginBottom: 70,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  cardRestaurant: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: 150,
    flex: 1,
  },
});

{
}
