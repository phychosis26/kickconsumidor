import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { Button } from "native-base";
import Loading from "../ui/Loading";
import { validarEmail, validarTelefono } from "../../utilidades/Validaciones";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../styles/global";

//registro de usuario
export default function FormularioRegistro(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  //recuperar los datos del formulario
  const [formData, setFormData] = useState(defaultFormValue());
  //navegacion a la pagina de usuario
  const navigation = useNavigation();
  //pantalla de espera mientra recibe la solicitud de creacion de la cuenta
  const [loading, setLoading] = useState(false);
  //validar y llenar los datos del formulario
  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword) ||
      isEmpty(formData.phone)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validarEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
    } else if (!validarTelefono(formData.phone)) {
      toastRef.current.show("El número celular es incorrecto");
    } else {
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("cuenta");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show(
            "El email ya se encuentra registrado, pruebe con otro."
          );
        });
    }
  };
  //escuchar cambios para cambiar las variables del formulario
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={[globalStyles.formContainer, styles.centrar]}>
      <Input
        placeholder="Correo electronico"
        containerStyle={[globalStyles.inputFrom, { backgroundColor: "#FFF" }]}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={globalStyles.iconRight}
          />
        }
      />
      <Input
        placeholder="Número Celular"
        containerStyle={[globalStyles.inputFrom, { backgroundColor: "#FFF" }]}
        onChange={(e) => onChange(e, "phone")}
        keyboardType="phone-pad"
        rightIcon={
          <Icon
            type="material-community"
            name="phone"
            iconStyle={globalStyles.iconRight}
          />
        }
      />

      <Input
        placeholder="Contraseña"
        containerStyle={[globalStyles.inputFrom, { backgroundColor: "#FFF" }]}
        passwordRules={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={globalStyles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repita la contraseña"
        containerStyle={[globalStyles.inputFrom, { backgroundColor: "#FFF" }]}
        passwordRules={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={globalStyles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        style={[globalStyles.boton, { marginTop: 40 }]}
        block
        rounded
        success
        onPress={onSubmit}
      >
        <Text style={globalStyles.botonTexto}>Unirse</Text>
      </Button>

      <Loading isVisible={loading} text="Creando cuenta..." />
    </View>
  );
}
//capturar los datos del formulario
function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
  };
}

const styles = StyleSheet.create({
  centrar: {
    paddingTop: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
});
