import React, { useEffect, useContext, useState, Fragment } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
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
export default function PedidosGeneral() {

  const uid = firebase.auth().currentUser.uid;
  const { ordenes, obtenerOrdenes } = useContext(FirebaseContext);
  const [mesSelect, setMesSelect] = useState(new Date().getMonth() + 1);
  useEffect(() => {
    obtenerOrdenes(uid);
  }, []);

  return (
    <Container>
      <Content>
        <CarouselMes mesSelect={mesSelect} setMesSelect={setMesSelect} />
        <List>
          {ordenes.map((orden, i) => {
            var timestamp = orden.creado.toDate();
            var myDate = new Date(timestamp);
            var formatedTime = myDate.toLocaleDateString();

            var mes = myDate.getMonth() + 1;

            return (
              <View key={i}>
                {mes === mesSelect && (
                  <Fragment>
                    <ListItem>
                      <Thumbnail
                        large
                        square
                        source={require("../../../assets/icon.png")}
                      ></Thumbnail>

                      <Body style={{ paddingLeft: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>Orden:{i}</Text>
                        {orden.orden.map((platillo, i) => {
                          return (
                            <View key={i}>
                              <Text note>
                                Cantidad: {platillo.cantidad} - (
                                {platillo.nombre})
                              </Text>
                              <Text style={{ fontWeight: "bold" }} note>
                                Total: {platillo.total}
                              </Text>
                            </View>
                          );
                        })}
                        <Text style={{ fontWeight: "bold" }}>
                          Total a pagar:{" "}
                          {(
                            parseFloat(orden.totalOrden) +
                            parseFloat(orden.totalTranporte)
                          ).toFixed(2)}
                        </Text>
                        <Text>Fecha: {formatedTime}</Text>
                      </Body>
                    </ListItem>
                  </Fragment>
                )}
              </View>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

function CarouselMes(props) {
  const { mesSelect, setMesSelect } = props;
  const [select, setSelect] = useState();

  const onChangeSelect = (newSelect) => {
    setMesSelect(newSelect);
    seleccionar(newSelect);
  };
  const seleccionar = (cat) => {
    setSelect(cat);
  };
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreList}
      >
        {categorias.map((catg) => (
          <View
            style={[styles.restaurant, { borderColor: "#000" }]}
            key={catg.key}
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    catg.key != mesSelect ? "#c9c9c9" : "#fe2241",
                },
              ]}
            >
              <Text
                style={[
                  styles.texto,
                  {
                    fontWeight: catg.key != mesSelect ? "normal" : "bold",
                    color: catg.key != mesSelect ? "#000" : "white",
                  },
                ]}
                onPress={() => onChangeSelect(catg.key)}
              >
                {catg.cat}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const categorias = [
  { key: 1, cat: "Enero" },
  { key: 2, cat: "Febrero" },
  { key: 3, cat: "Marzo" },
  { key: 4, cat: "Abril" },
  { key: 5, cat: "Mayo" },
  { key: 6, cat: "Junio" },
  { key: 7, cat: "Julio" },
  { key: 8, cat: "Agosto" },
  { key: 9, cat: "Septiembre" },
  { key: 10, cat: "Octubre" },
  { key: 11, cat: "Noviembre" },
  { key: 12, cat: "Diciembre" },
];

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
  genres: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 4,
  },
  texto: {
    marginRight: 10,
    fontSize: 15,
    marginLeft: 7,
  },
  genreList: {
    paddingHorizontal: 0,
    padding: 8,
  },
  restaurant: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 25,
  },
  card: {
    padding: 5,
    borderRadius: 25,
    flex: 1,
  },
});
