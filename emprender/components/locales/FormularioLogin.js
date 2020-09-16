import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validarTelefono } from "../../utilidades/Validaciones";
import Loading from "../../components/ui/Loading";
import globalStyles from "../../styles/global";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Modal from "../../components/ui/Modal";

//muestra el formulario de logueo que si ingresa lleva a cuenta para valdar nuevamente si ya esta logueado o no
export default function LoginForm(props) {
  const { toasRef } = props;
  const [formData, setFormData] = useState(defaultFormValue());
  //estado del loading
  const [loading, setLoading] = useState(false);
  //navegacion
  const navigate = useNavigation();

  //recaptcha
  const recaptchaVerifier = useRef(null);
  const [numeroTelef, setNumeroTelef] = useState();
  const [verificacionId, setVerificacionId] = useState();
  const [isVisibleMododal, setIsVisibleModal] = useState(false);
  const [mensaje, mostrarMensaje] = React.useState(
    !firebaseConfig || Platform.OS === "web"
  );
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  //enviar el formulario
  const onSubmit = () => {
    let numValidado = validarTelefono(numeroTelef);
    if (numValidado === 0) {
      toasRef.current.show("El número no es correcto");
    } else {
      solicitarCodigo(numValidado);
    }
  };
  const solicitarCodigo = async (num) => {
    try {
      // al llamar el revify se mostrara el modal recatcha
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificacionId = await phoneProvider.verifyPhoneNumber(
        num,
        recaptchaVerifier.current
      );
      setVerificacionId(verificacionId);
      await toasRef.current.show(
        "Te enviamos el código por SMS revisa tu teléfono por favor...",
        5000
      );
    } catch (err) {
      toasRef.current.show(
        "Error al enviar el código, vuelve a intentarlo más tarde por favor :(",
        5000
      );
    }
  };

  return (
    <View style={globalStyles.formContainer}>
      {/* pantalla de recaptcha */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        cancelLabel="Cancelar"
      />
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={globalStyles.logo}
      />
      {/* cuerpo del screen */}
      <Text style={{ marginTop: 30, fontSize: 17 }}>
        Ingresa tu número celular
      </Text>
      <Icon
        type="material-community"
        name={"arrow-down-bold-outline"}
        size={22}
        color={"#000"}
      />
      <Input
        style={{
          marginVertical: 10,
          fontSize: 17,
          textAlign: "center",
        }}
        placeholder="0999999999"
        autoFocus
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        rightIcon={
          <Icon
            type="material-community"
            name={"phone-outline"}
            iconStyle={{ color: "#000" }}
          />
        }
        onChangeText={(numeroTelef) => setNumeroTelef(numeroTelef)}
      />
      <Button
        title="Solicitar código de verificación"
        disabled={!numeroTelef}
        onPress={onSubmit}
      />
      <Icon
        type="material-community"
        name={"arrow-down-bold-outline"}
        size={22}
        color={"#000"}
      />
      <ModalCod
        isVisibleMododal={isVisibleMododal}
        setIsVisibleModal={setIsVisibleModal}
        toastRef={toasRef}
        numeroTelef={numeroTelef}
        verificacionId={verificacionId}
      />
      {/* <Text style={{ marginTop: 20 }}>Ingresa el código de verificación </Text>
      <Input
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificacionId}
        placeholder="123456"
        onChangeText={setVerificacionCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificacionId}
        onPress={async () => {
          try {
            const credencial = firebase.auth.PhoneAuthProvider.credential(
              verificacionId,
              verificacionCode
            );
            await firebase.auth().signInWithCredential(credencial);
            mostrarMensaje({ text: "Phone authentication successful 👍" });
          } catch (err) {
            mostrarMensaje({ text: `Error: ${err.mensaje}`, color: "red" });
          }
        }}
      /> */}

      {/* {mensaje ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => mostrarMensaje(undefined)}
        >
          <Text
            style={{
              color: mensaje.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {mensaje.text}
          </Text>
        </TouchableOpacity>
      ) : undefined} */}

      {/* <Input
        placeholder="Correo electronico"
        containerStyle={globalStyles.inputForm}
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
        placeholder="Contrase;a"
        containerStyle={globalStyles.inputForm}
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
      <Button
        title="Iniciar Sesion"
        containerStyle={globalStyles.btnContainer}
        buttonStyle={globalStyles.btnStyle}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesion" /> */}
    </View>
  );
}

function ModalCod(props) {
  const {
    isVisibleMododal,
    setIsVisibleModal,
    toastRef,
    numeroTelef,
    verificacionId,
  } = props;
  const [verificacionCode, setVerificacionCode] = useState();
  return (
    <Modal isVisible={isVisibleMododal} setIsVisible={setIsVisibleModal}>
      <View>
        <Text style={{ marginTop: 20 }}>Ingresa el código de verificación</Text>
        <Input
          style={{ marginVertical: 10, fontSize: 17 }}
          editable={!!verificacionId}
          placeholder="123456"
          onChangeText={setVerificacionCode}
        />
        <Button
          title="Confirm Verification Code"
          disabled={!verificacionId}
          onPress={async () => {
            try {
              const credencial = firebase.auth.PhoneAuthProvider.credential(
                verificacionId,
                verificacionCode
              );
              await firebase.auth().signInWithCredential(credencial);
              mostrarMensaje({ text: "Phone authentication successful 👍" });
            } catch (err) {
              mostrarMensaje({ text: `Error: ${err.mensaje}`, color: "red" });
            }
          }}
        />
      </View>
    </Modal>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}
