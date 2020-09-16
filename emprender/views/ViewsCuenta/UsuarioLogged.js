import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View,ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/ui/Loading";
import InfoUsuario from "../../components/locales/InfoUsuario";
import OpcionesCuenta from "../../components/locales/OpcionesCuenta";

//para usuarios logueados
export default function UsuarioLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const toastRef = useRef();
  //estado para actualizar el perfil
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  //recuperar los datos de firebase
  useEffect(() => {
    //funcion autoejecutable
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    console.log(userInfo);
    setReloadUserInfo(false);
  }, [reloadUserInfo]);
  return (
    // && si user info tiene valor se muestra el <InfoUser> y se envia por props todos los valores devueltos de firebase
    <ImageBackground
      source={require("../../../assets/screen_KUICK/fondo_opt.jpg")}
      style={{ flex: 1 }}
    >
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUsuario
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      )}
      <OpcionesCuenta
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}
      />

      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionPress}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 2,
    borderBottomColor: "#e3e3e3",
    paddingBottom: 10,
    paddingTop: 10,
  },
  btnCloseSessionPress: {
    color: "#fe2241",
  },
});
