import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validarEmail } from "../../utilidades/Validaciones";
import { reautenticar } from "../../utilidades/reautenticar";
import { size } from "lodash";

export default function ChangePasswordFrom(props) {
  const { setShowModal, toastRef } = props;
  //validacion de la contrase;a
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
    let isSetErrors = true;
    let errorsTemp = {};
    setError({});
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: !formData.password
          ? "La contraseña no puede estar vacia."
          : "",
        newPassword: !formData.newPassword
          ? "La contraseña no puede estar vacia."
          : "",
        repreatNewPassword: !formData.repeatNewPassword
          ? "La contraseña no puede estar vacia."
          : "",
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: "Las contraseñas no son iguales.",
        repreatNewPassword: "Las contraseñas no son iguales.",
      };
    } else if (!formData.password) {
      setError({
        password: "La contraseña no puede estar vacia.",
      });
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La contraseña debe tener más de 5 caracteres",
        repeatNewPassword: "La contraseña debe tener más de 5 caracteres",
      };
    } else {
      setIsLoading(true);
      await reautenticar(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              isSetErrors = false;
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(() => {
              errorsTemp = {
                other: "Error al actualizar la contraseña",
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          errorsTemp = {
            password: "La contraseña no es correcta",
          };
          setIsLoading(false);
        });
    }
    //validar estado con iserror
    isSetErrors && setError(errorsTemp);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        passwordRules={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        defaultValue={""}
        onChange={(e) => onChange(e, "password")}
        errorMessage={error.password}
      />
      <Input
        placeholder="Nueva Contraseña"
        containerStyle={styles.input}
        passwordRules={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        defaultValue={""}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir Nueva Contraseña"
        containerStyle={styles.input}
        passwordRules={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        defaultValue={""}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={error.repeatNewPassword}
      />
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onsubmit}
        loading={isLoading}
      />
      <Text>{error.other}</Text>
    </View>
  );
}

function defaultValues() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
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
