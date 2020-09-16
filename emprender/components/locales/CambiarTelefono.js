import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function CambiarTelefono(props) {
  const { displayNumber, setShowModal, toastRef, setReloadUserInfo } = props;
  //validacion de formulario
  const [error, setError] = useState(null);
  //animacion de loading en boton
  const [isLoading, setIsLoading] = useState(false);
  //guardar los datos del formulario
  const [newDisplayNumber, setNewDisplayNumber] = useState(null);
  console.log(newDisplayNumber);
  const onsubmit = () => {
    setError(null);
    if (!newDisplayNumber) {
      setError("Debe existir un número.");
    } else if (displayNumber === newDisplayNumber) {
      setError("El número no puede ser igual al actual.");
    } else {
      setIsLoading(true);
      const update = {
        displayName: "sdsss",
        phoneNumber: "+593979026326",
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadUserInfo(true);
          setShowModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el número telefónico.");
          setIsLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Número telefónico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "phone-outline",
          color: "#c2c2c2",
        }}
        defaultValue={""}
        onChange={(e) => setNewDisplayNumber(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar número"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onsubmit}
        loading={isLoading}
      />
    </View>
  );
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
