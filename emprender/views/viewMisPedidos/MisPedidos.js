import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import FirebaseContext from "../../context/firebase/firebaseContext";
import * as firebase from "firebase";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Thumbnail,
} from "native-base";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const {width,height}=Dimensions.get("window");
export default function MisPedidos() {
  {
    /*
  var timestamp = item.creado.toDate();
  var myDate = new Date(timestamp).getMonth();
  var formatedTime = myDate + 1;
  */
  }
  const navigation = useNavigation();
  const uid = firebase.auth().currentUser.uid;
  const { ordenes, obtenerOrdenes } = useContext(FirebaseContext);
  useEffect(() => {
    obtenerOrdenes(uid);
  }, []);

  console.log(ordenes)
  return (
    <Container>
      
      {ordenes.length === 0 ? (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <Image
            source={require("../../../assets/Kuick/NoencontraronResultados-min.png")}
            resizeMode="contain"
            style={{ width: width, height: height, flex: 1, marginTop: 10 }}
          />
        </View>
      ):(
        <Content>
        <List>
          {ordenes.map((orden, i) => {
            //fecha de la orden
            var timestamp = orden.creado.toDate();
            var myDate = new Date(timestamp);
            var formatedTime = myDate.toLocaleDateString();
            //fecha actual
            var actual = new Date();
            var formatedactual = actual.toLocaleDateString();

            if (formatedTime === formatedactual) {
              return (
                <Fragment key={i}>
                  <ListItem>
                    <Thumbnail
                      large
                      square
                      source={require("../../../assets/icon.png")}
                    ></Thumbnail>

                    <Body style={{ paddingLeft: 10 }}>
                      <Text style={{ fontWeight: "bold" }}>Orden:{i + 1}</Text>
                      {orden.orden.map((platillo, i) => {
                        return (
                          <View key={i}>
                            <Text note>
                              Cantidad: {platillo.cantidad} - ({platillo.nombre}
                              )
                            </Text>
                            <Text style={{ fontWeight: "bold" }} note>
                              Total: {platillo.total}
                            </Text>
                          </View>
                        );
                      })}
                      <Text style={{ fontWeight: "bold" }}>
                        Total a pagar:
                        {(
                          parseFloat(orden.totalOrden) +
                          parseFloat(orden.totalTranporte)
                        ).toFixed(2)}
                      </Text>
                      {orden.comentario && (
                        <Button
                          title="Deja por favor un comentario"
                          type="outline"
                          onPress={() => {
                            navigation.navigate("add-review-local", {
                              idRestaurant: orden.id,
                            });
                          }}
                        />
                      )}
                    </Body>
                  </ListItem>
                </Fragment>
              );
            }
          })}
        </List></Content>
      )}
        
      
    </Container>
  );
}

const styles = StyleSheet.create({
  desti: {
    width: "100%",
    height: 530,
    alignItems: "center",
  },
  desti2: {
    width: "100%",
    height: 530,
  },
});
