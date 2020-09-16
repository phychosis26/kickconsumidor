import React, { useState, useContext, useEffect } from "react";
import { Alert, Text, Image, StyleSheet, ScrollView } from "react-native";
import * as Font from "expo-font";
import {
  Input,
  Button,
  Footer,
  FooterTab,
  Icon,
  View,
  Container,
  Content
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../../styles/global";

import PedidoContext from "../../../context/pedidos/pedidosContext";
import FirebaseContext from "../../../context/firebase/firebaseContext";
import ListItemProductos from "../../../components/pedido/ListItemProductos";

const FormularioPlatillo = (props) => {
  //state para cantidades
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  //iniciar el xontext contex

  const { producto, local, guardarPedido } = useContext(
    PedidoContext
  );
  const { productos } = useContext(FirebaseContext);

  const { nombre, imagen, precio } = producto;

  //check de los productos escogidos
  const [checked, setChecked] = useState(nombre);
  //redireccionar
  const navigation = useNavigation();
  //al iniciar a claculae la cantidad

  useEffect(() => {
    calcularTotal();
  }, [cantidad, producto]);

  useEffect(() => {
    guardarCantidad(1);
  }, [producto]);

  //calcular el total del producto
  const calcularTotal = () => {
    if (cantidad > 0) {
      const totalPagar =parseFloat(precio*cantidad).toFixed(2);
      guardarTotal(totalPagar);
    } else {
      precio=parseFloat(precio).toFixed(2);
      guardarTotal(precio);
    }
  };

  //decrementar cantidad
  const decrementar = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };
  //incrementar cantidad
  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  //confirmar si la orden es correcta
  const confirmarOrden = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    Alert.alert(
      "Deseas confirmar tu pedido?",
      "Un pedido confirmado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            //generar id de la confirmacion
            var id = 2 + Math.random() * (20 - 2) + "E";
            let idlocal = local.id;
            let nomlocal = local.name;
            let telfLocal = local.telefono;
            let codigoLoc = local.codigoUs;
            let fecha = new Date();
            let ubiloc = local.location;
            let address = local.address;
            let instruccion = "";
            let idCat = local.idCat;

            //almacenar el pedido al pedido principal
            var pedido = {
              ...producto,
              cantidad,
              total,
              id,
              idlocal,
              nomlocal,
              telfLocal,
              codigoLoc,
              fecha,
              ubiloc,
              address,
              instruccion,
              idCat,
            };
            guardarPedido(pedido);
            // //navegar hacia el resumen
            navigation.navigate("cesta");
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <Container>
      
        <Image style={styles.imagen} resizeMode="stretch" source={{ uri: imagen[0] }} />
        <View >
          <View>
              <View>
                <Text style={globalStyles.cantidad}>Subtotal: $ {total}</Text>
              </View>
              <View style={{flexDirection:"row",padding:10,paddingHorizontal:50}}>
              <Button
                    props
                    rounded
                    style={{
                      backgroundColor: "#fe2241",
                      width: 80,
                      height: 60,
                      justifyContent: "center",
                      
                    }}
                    onPress={() => decrementar()}
                  >
                    <Icon name="remove" />
                  </Button>
                  <Input
                    disabled
                    style={{ textAlign: "center", fontSize: 25 }}
                    value={cantidad.toString()}
                    keyboardType="numeric"
                    onChangeText={(cantidad) => guardarCantidad(cantidad)}
                  />
                  <Button
                    rounded
                    props
                    dark
                    style={{ width: 80, height: 60, justifyContent: "center" }}
                    onPress={() => incrementar()}
                  >
                    <Icon name="add" />
                  </Button>
              </View>
          </View>
        </View>
        <Content>
        <View style={styles.viewPrincipal}>
          {productos !== undefined &&
            productos.map((datos, index) => {
              return (
                <ListItemProductos
                  item={datos}
                  key={index}
                  navigation={navigation}
                  categoria={props.route.params.categoria}
                  checked={checked}
                  setChecked={setChecked}
                />
              );
            })}
        </View>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: "#fe2241" }}
            onPress={() => confirmarOrden()}
          >
            <Text style={globalStyles.botonTexto}> Agregar al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  imagen: {
    height: 200,
    borderWidth: 6,
    borderColor: "black",
  },
  bodyCard: {
    paddingTop: 0,
  },
  descri: {
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default FormularioPlatillo;
