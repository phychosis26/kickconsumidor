import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebaseDB from "../../firebase";
import * as firebase from "firebase";
import { validarEmail } from "../../utilidades/Validaciones";
import { reautenticar } from "../../utilidades/reautenticar";

export default function CambiarEmail(props) {
  const { uid, email, setShowModal, toastRef, setReloadUserInfo } = props;
  //validacion del email
  const [error, setError] = useState({});
  //animacion de loading en boton
  const [isLoading, setIsLoading] = useState(false);
  //mostrar-ocultar la contrase;a
  const [showPassword, setShowPassword] = useState(false);
  //guardar los datos del formulario
  const [formData, setFormData] = useState(defaultValues());
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onsubmit = async () => {
    setError({});
    if (!validarEmail(formData.email)) {
      setError({ email: "El email es incorrecto." });
    } else {
      setIsLoading(true);
      //escribir el pedido en firebase
      try {
        const user = await firebase.auth().currentUser;
        await firebaseDB.db
          .collection("usuarios")
          .doc(user.uid)
          .update({ email: formData.email });
        setReloadUserInfo(true);
        setIsLoading(false);
        setShowModal(false);
        //pedidoRealizado(pedido.id);
        // //redireccionar
        // navigation.navigate("progresoPedido");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setShowModal(false);
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        defaultValue={email || ""}
        onChange={(e) => onChange(e, "email")}
        errorMessage={error.email}
      />

      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onsubmit}
        loading={isLoading}
      />
    </View>
  );
}

function defaultValues() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
