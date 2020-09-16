import React from "react";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";

export default function ListaCard(props) {
  console.warn(props.item.images[0]);
  return (
    <View style={Styles.card}>
      <Image style={Styles.logo} source={{ uri: props.item.images[0] }}></Image>

      <View style={{display:'flex', flexDirection:'row'}}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={{ display: "flex", flexDirection: "row", marginTop:5 }}>
            <Icon type="material-community" name="store" color="red" />
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {props.item.name}
            </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row", marginTop:5 }}>
            <Icon type="material-community" name="map" color="grey" />
            <Text style={{ fontSize: 17, color: "grey" }}>
              {props.item.address}
            </Text>
          </View>
        </View>

        <View style={{marginTop:-40,display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:17}}>
        <View style={Styles.iconOpen}>
        <Icon reverse type="material-community" name="lightbulb" color="black"  />
        </View>
        
        <Text style={{textAlign:'center'}}>Abierto</Text>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>Horario: {props.item.horario}</Text>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  card: {
    marginRight: "auto",
    marginLeft: "auto",
    padding: 10,
    width: "95%",
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: 150,
    marginBottom:10
  },
  logo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
    height: 65,
    resizeMode:'contain'
  },
  iconOpen:{
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor:'white',
    borderRadius:50
  }
});
