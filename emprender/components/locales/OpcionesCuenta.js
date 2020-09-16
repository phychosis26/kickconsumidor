import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import ModalOpciones from "../ui/ModalOpciones";
import CambiarNombre from "./CambiarNombre";
import CambiarEmail from "./CambiarEmail";
import { useNavigation } from "@react-navigation/native";
export default function OpcionesCuenta(props) {
  const { userInfo, toastRef, setReloadUserInfo } = props;
  //estado para mostrar el modal
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  //funcion para ejecutar el click.. obtener el componente a renderizar
  const selectdComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <CambiarNombre
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;

      case "email":
        setRenderComponent(
          <CambiarEmail
            uid={userInfo.uid}
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;

      case "misPedidos":
        setRenderComponent(<></>);
        setShowModal(true);
        break;
      case "mapa":
        setRenderComponent(<></>);
        setShowModal(true);
        break;

      default:
        setRenderComponent(false);
        setShowModal(false);
        break;
    }
  };

  const menuOptions = generateOptions(selectdComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}
      {renderComponent && (
        <ModalOpciones isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </ModalOpciones>
      )}
    </View>
  );
}

function generateOptions(selectdComponent) {
  const navigation = useNavigation();
  return [
    // {
    //   title: "cambiar nombre y apellidos",
    //   iconType: "material-community",
    //   iconNameLeft: "account-circle",
    //   iconColorLeft: "#fe2241",
    //   iconNameRight: "chevron-right",
    //   iconColorRight: "#fe2241",
    //   onPress: () => selectdComponent("displayName"),
    // },
    // {
    //   title: "Cambiar Email",
    //   iconType: "material-community",
    //   iconNameLeft: "at",
    //   iconColorLeft: "#fe2241",
    //   iconNameRight: "chevron-right",
    //   iconColorRight: "#fe2241",
    //   onPress: () => selectdComponent("email"),
    // },
    // {
    //   title: "Cambiar Contraseña",
    //   iconType: "material-community",
    //   iconNameLeft: "lock-reset",
    //   iconColorLeft: "#fe2241",
    //   iconNameRight: "chevron-right",
    //   iconColorRight: "#fe2241",
    //   onPress: () => selectdComponent("password"),
    // },
    {
      title: "Factura",
      iconType: "material-community",
      iconNameLeft: "book-outline",
      iconColorLeft: "#fe2241",
      iconNameRight: "chevron-right",
      iconColorRight: "#fe2241",
      onPress: () => navigation.navigate("factura"),
    },
    {
      title: "Mis pedidos",
      iconType: "material-community",
      iconNameLeft: "star-outline",
      iconColorLeft: "#fe2241",
      iconNameRight: "chevron-right",
      iconColorRight: "#fe2241",
      onPress: () => navigation.navigate("pedidog"),
    },
    {
      title: "Mapa",
      iconType: "material-community",
      iconNameLeft: "map",
      iconColorLeft: "#fe2241",
      iconNameRight: "chevron-right",
      iconColorRight: "#fe2241",
      onPress: () => navigation.navigate("mapa"),
    },
  ];
}
const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
