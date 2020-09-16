import React, { useState, useEffect } from "react";
import { CheckBox, Input, Button } from "react-native-elements";
import { View, StyleSheet, ImageBackground } from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";

import firebase from "../../firebase";
import * as firebaseDb from "firebase";

import { useNavigation } from "@react-navigation/native";

//primera pantalla de Cuenta
export default function Factura() {
  const [check, setCheck] = useState(false);
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [cedula, setCI] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dialog, setDialog] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    consultarDatos();
  }, []);

  const consultarDatos = async () => {
    setDialog(true);
    await firebase.db
      .collection("usuarios")
      .where("numero", "==", firebaseDb.auth().currentUser.phoneNumber)
      .onSnapshot(manejarSnapshot);
    function manejarSnapshot(snapshot) {
      let productos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      try {
        if (productos.length !== 0) {
          setNombre(productos[0].nombre);
          setCI(productos[0].cedula);
          setMail(productos[0].mail);
          setDireccion(productos[0].direccion);
          setCheck(productos[0].estado);
        }
      } catch (e) {}

      setDialog(false);
    }
  };

  const guardarDatos = async () => {
    const datos = {
      cedula: cedula,
      direccion: direccion,
      estado: check,
      mail: mail,
      nombre: nombre,
      numero:firebaseDb.auth().currentUser.phoneNumber
    };
    setDialog(true);
    await firebase.db
      .collection("usuarios")
      .doc(firebaseDb.auth().currentUser.phoneNumber)
      .set(datos);
    setDialog(false);
    navigation.navigate("cuenta")
  };

  return (
    <ImageBackground
      source={require("../../../assets/screen_KUICK/bienv-min.png")}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={{ padding: 20 }}>
        <CheckBox
          center
          title="Desea factura?"
          checked={check}
          onPress={() => setCheck(!check)}
        />
        <View
          style={{
            padding: 30,
            margin: 5,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Input
            label="Nombre"
            placeholder="Nombre completo"
            containerStyle={styles.input}
            rightIcon={{
              type: "material-community",
              name: "pen",
              color: "#c2c2c2",
            }}
            defaultValue={nombre || ""}
            onChange={(e) => {
              setNombre(e.nativeEvent.text);
            }}
            //errorMessage={error.email}
          />
          <Input
            label="C.I"
            placeholder="Cédula de identidad o Ruc"
            containerStyle={styles.input}
            rightIcon={{
              type: "material-community",
              name: "pen",
              color: "#c2c2c2",
            }}
            defaultValue={cedula || ""}
            onChange={(e) => {
              setCI(e.nativeEvent.text);
            }}
            //errorMessage={error.email}
          />
          <Input
            label="E-Mail"
            placeholder="Correo electrónico"
            containerStyle={styles.input}
            rightIcon={{
              type: "material-community",
              name: "pen",
              color: "#c2c2c2",
            }}
            defaultValue={mail || ""}
            onChange={(e) => {
              setMail(e.nativeEvent.text);
            }}
            //errorMessage={error.email}
          />
          <Input
            label="Dirección"
            placeholder="Dirección"
            containerStyle={styles.input}
            rightIcon={{
              type: "material-community",
              name: "pen",
              color: "#c2c2c2",
            }}
            defaultValue={direccion || ""}
            onChange={(e) => {
              setDireccion(e.nativeEvent.text);
            }}
            //errorMessage={error.email}
          />
        </View>
        <Button title="Guardar Datos" onPress={() => guardarDatos()} />
        <ProgressDialog
          visible={dialog}
          title="Cargando datos"
          message="Espere por favor..."
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
