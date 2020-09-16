import React, {  useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import firebase from "../../firebase";
import { ListItem, CheckBox } from "react-native-elements";

export default function Deposito() {
  const [cuentas, setCuentas] = useState([]);
  const [checked, setChecked] = useState("nombre");

  useEffect(() => {
    firebase.db.collection("cuentasDeposito").onSnapshot(manejarSnapshot);
  }, []);

  function manejarSnapshot(snapshot) {
    let datos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setCuentas(datos);
  }

  return (
    <ScrollView>
      <FlatList
        data={cuentas}
        renderItem={(item) => (
          <ListCuentas data={item} checked={checked} setChecked={setChecked} />
        )}
      />
      {cuentas.map((datos, index) => {
        if (datos.id === checked) {
          return (
            <View key={index}>
              <View style={styles.padre}>
                <Text style={styles.centrado}>
                  Para realizar un pago mediante transferencia o depósito, debe
                  seguir los siguientes pasos:
                </Text>
                <Text style={[styles.negrita, styles.centrado]}>
                  ⚠️NO REALICE SU PEDIDO SIN COMPLETAR LOS 3 PASOS:
                </Text>
                <View>
                  <Text style={styles.negrita}>✅Paso 1:</Text>
                  <Text>
                    Realice su transferencia o depósito a la siguiente cuenta
                  </Text>
                </View>
                <View style={styles.conteniedoCuenta}>
                  <View style={styles.lineaRecta}>
                    <Text style={styles.negrita}>📑Número de cuenta: </Text>
                    <Text>{datos.numero}</Text>
                  </View>
                  <View style={styles.lineaRecta}>
                    <Text style={styles.negrita}>🏷️Tipo de cuenta: </Text>
                    <Text>{datos.tipo}</Text>
                  </View>
                  <View style={styles.lineaRecta}>
                    <Text style={styles.negrita}>✒️Titular de la cuenta: </Text>
                    <Text>{datos.nombre}</Text>
                  </View>
                  <View style={styles.lineaRecta}>
                    <Text style={styles.negrita}>📚Cédula: </Text>
                    <Text>{datos.ci}</Text>
                  </View>
                  <View style={styles.lineaRecta}>
                    <Text style={styles.negrita}>📫Correo: </Text>
                    <Text>{datos.correo}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.negrita}>✅Paso 2:</Text>
                  <Text style={styles.centrado}>
                    Después de hacer su transferencia o depósito espere que un
                    repartidor KUICK se comunique con usted y envíele una
                    captura del comprobante del depósito o transferencia
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

function ListCuentas(props) {
  const { data, checked, setChecked } = props;
  const { item } = data;
  const checkedData = (newSelect) => {
    setChecked(newSelect);
  };

  return (
    <ListItem
      key={data.index}
      bottomDivider
      title={"" + item.banco}
      onPress={() => checkedData(item.id)}
      containerStyle={{padding:8}}
      rightElement={
        <CheckBox
          checked={item.id !== checked ? false : true}
          onPress={() => {
            checkedData(item.id);
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  centrado: {
    textAlign: "center",
    marginBottom: 10,
  },
  padre: {
    padding: 20,
  },
  negrita: {
    fontWeight: "bold",
  },
  conteniedoCuenta: {
    padding: 5,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  lineaRecta: {
    flexDirection: "row",
  },
});
