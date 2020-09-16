import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {Icon} from "react-native-elements";
import { Button } from "native-base";

export default function PrincipalGeneral(props) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/screen_KUICK/fondoimg-min.png")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center",marginTop:"1%" }}
    >
      <View style={{marginTop:50}}> 
      <View >
        <View >
          <View style={styles.contenedor}>
            <View>
              <View style={{flexDirection:"row"}}>
              <Text style={{fontWeight:"bold",fontSize:22,marginRight:10}}>COMIDA A DOMICILIO</Text>
              <Icon
                    size={30}
                    type="material-community"
                    name="motorbike"
                    color={"red"}
                    underlayColor="transparent"
                    
                  />
              </View>
              
              <Button
              bordered
              
                style={{
                  borderColor:(255,255,255,1),
                  height:220
                }}
                block
                success
                onPress={() => navigation.navigate("listaConsumidores")}
              >
                <Image
                  style={styles.desti}
                  source={require("../../assets/img/consumidor.png")}
                />
              </Button>
            </View>
          </View>
          <View style={styles.contenedor2}>
            <View>
            <View style={{flexDirection:"row"}}>
              <Text style={{fontWeight:"bold",fontSize:22,marginRight:10}}>COMPRA AL POR MAYOR</Text>
              <Icon
                    size={30}
                    type="material-community"
                    name="truck-fast"
                    color={"red"}
                    underlayColor="transparent"
                    
                  />
              </View>
              <Button
              bordered
                style={{
                  borderColor:(255,255,255,1),
                  height:220
                }}
                block
                success
                onPress={() => navigation.navigate("localesProveedor")}
              >
                <Image
                  style={styles.desti}
                  source={require("../../assets/img/Proveedor.png")}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
      </View>
      
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  desti: { width: "100%", height: 200, marginVertical: 5 },
  desti2: { width: "100%", height: 200, marginVertical: 5 },
  banner: {
    height: 250,
    flex: 1,
  },
  ciudad: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
  },
  contenedor: {
    marginHorizontal: 10,
    marginTop: 20,
    padding:20
  },
  contenedor2: {
    marginTop:-40,
    marginHorizontal: 10,
    padding:20
  },
  listado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listadoItem: {
    flexBasis: "50%",
  },
});

{
  /* <ScrollView horizontal>
            <View>
              <Image
                style={styles.ciudad}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/actividad1.jpg")
                }
              />
            </View>
            <View>
              <Image
                style={styles.ciudad}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/actividad2.jpg")
                }
              />
            </View>
            <View>
              <Image
                style={styles.ciudad}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/actividad3.jpg")
                }
              />
            </View>
            <View>
              <Image
                style={styles.ciudad}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/actividad4.jpg")
                }
              />
            </View>
            <View>
              <Image
                style={styles.ciudad}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/actividad5.jpg")
                }
              />
            </View>
          </ScrollView> */
}

{
  /* <View style={styles.listado}>
            <View style={styles.listadoItem}>
              <Image
                style={styles.desti}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/mejores1.jpg")
                }
              />
            </View>
            <View style={styles.listadoItem}>
              <Image
                style={styles.desti}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/mejores1.jpg")
                }
              />
            </View>
            <View style={styles.listadoItem}>
              <Image
                style={styles.desti}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/mejores1.jpg")
                }
              />
            </View>
            <View style={styles.listadoItem}>
              <Image
                style={styles.desti}
                source={
                  imagen
                    ? { uri: imagen }
                    : require("../../assets/inicioGeneral/mejores1.jpg")
                }
              />
            </View>
          </View> */
}
