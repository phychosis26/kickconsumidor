import React, { useState, useRef } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button } from "native-base";
import { Input, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Toast from "react-native-easy-toast";

import { validarTelefono } from "../../utilidades/Validaciones";
import Loading from "../../components/ui/Loading";
import globalStyles from "../../styles/global";
import Modal from "../../components/ui/Modal";

//formulario de logueo
export default function Login() {
  const toastRef = useRef();

  //estado del loading
  const [loading, setLoading] = useState(false);

  //recaptcha
  const recaptchaVerifier = useRef(null);
  const [numeroTelef, setNumeroTelef] = useState();
  const [verificacionId, setVerificacionId] = useState(null);
  const [isVisibleMododal, setIsVisibleModal] = useState(false);

  //si existe alguna configuracion
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  //envia solicitud del sms
  const onSubmit = () => {
    console.log(numeroTelef);
    if (numeroTelef === undefined) {
      numeroTelef = 0;
    }
    ///validar numero telefonico y aumentarle el +593
    let numValidado = validarTelefono(numeroTelef);
    if (numValidado === 0) {
      toastRef.current.show("El número no es correcto");
    } else {
      solicitarCodigo(numValidado);
    }
  };
  //captura del ID del numero
  const solicitarCodigo = async (num) => {
    try {
      // al llamar el revify se mostrara el modal recatcha
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificacionId = await phoneProvider.verifyPhoneNumber(
        num,
        recaptchaVerifier.current
      );
      setVerificacionId(verificacionId);
      toastRef.current.show(
        "Te enviamos el código por SMS revisa tu teléfono por favor...",
        5000
      );
      setIsVisibleModal(true)
    } catch (err) {
      console.log(err);
      console.log(numeroTelef);
      toastRef.current.show(
        "Error al enviar el código, vuelve a intentarlo más tarde por favor :(",
        5000
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/screen_KUICK/Todoenunsololugar-min.png")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <View style={globalStyles.formContainer}>
          {/* pantalla modal de recaptcha */}
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            cancelLabel="Cancelar"
          />
          <View
            style={{
              marginTop: 50,
              marginVertical: 10,
              fontSize: 17,
              width: "90%",
              textAlign: "center",
            }}
          >
            <Input
              placeholder="0999999999"
              autoFocus
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              containerStyle={{ backgroundColor: "#FFF" }}
              rightIcon={
                <Icon
                  type="material-community"
                  name={"phone-outline"}
                  iconStyle={{ color: "#000" }}
                />
              }
              onChangeText={(numeroTelef) => setNumeroTelef(numeroTelef)}
            />
          </View>
          <Button
            style={[globalStyles.boton, { marginTop: 40 }]}
            block
            onPress={onSubmit}
          >
            <Text style={globalStyles.botonTexto}>Enviar SMS</Text>
          </Button>
          <Button
            style={{ marginTop: 40 }}
            block
            disabled={!verificacionId}
            onPress={() => setIsVisibleModal(true)}
          >
            <Text style={globalStyles.botonTexto}>Confirmar código</Text>
          </Button>

          <ModalCod
            isVisibleMododal={isVisibleMododal}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
            verificacionId={verificacionId}
            setLoading={setLoading}
          />
          <Toast ref={toastRef} position="center" opacit={0.9} />
          <Loading text="Autenticando... 👍" isVisible={loading} />
        </View>
      </View>
    </ImageBackground>
  );
}

function ModalCod(props) {
  const {
    isVisibleMododal,
    setIsVisibleModal,
    verificacionId,
    toastRef,
    setLoading,
  } = props;
  //navegacion
  const navigation = useNavigation();
  const [verificacionCode, setVerificacionCode] = useState();
  return (
    <Modal isVisible={isVisibleMododal} setIsVisible={setIsVisibleModal}>
      <View style={globalStyles.viewBnt}>
        <Text style={globalStyles.tittleCodigo}>
          Ingresa el código de verificación
        </Text>
        <Input placeholder="123456" keyboardType="phone-pad"
              textContentType="telephoneNumber" onChangeText={setVerificacionCode} />
        <Button
          style={{ marginTop: 40 }}
          block
          disabled={!verificacionId}
          keyboardType="phone-pad"
          onPress={async () => {
            setLoading(true);
            try {
              const credencial = firebase.auth.PhoneAuthProvider.credential(
                verificacionId,
                verificacionCode
              );
              await firebase.auth().signInWithCredential(credencial);
              navigation.navigate("cuenta");
            } catch (err) {
              console.log(err);
              toastRef.current.show("Código incorrecto :(", 5000);
            }
            setLoading(false);
            setIsVisibleModal(false);
          }}
        >
          <Text style={globalStyles.botonTexto}>Enviar</Text>
        </Button>
      </View>
    </Modal>
  );
}
