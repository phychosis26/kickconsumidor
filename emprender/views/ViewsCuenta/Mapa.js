import React, { useState } from "react";
import { StyleSheet,View, ScrollView, Text,Dimensions,Image } from "react-native";
import { Input, Button, } from "react-native-elements";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "AIzaSyBorx9FPfjN0JV4DQeL9BhzBd0vW4wB55I";
const { width, height } = Dimensions.get("window");
export default function Mapa() {
  var coordenadas = [
    { latitude: -3.991863, longitude: -79.199036 },
    { latitude: -3.992255, longitude: -79.201009 },
    { latitude: -3.992255, longitude: -79.201374 },
    { latitude: -3.992642, longitude: -79.201244 },
    { latitude: -3.992814, longitude: -79.201175 },
    { latitude: -3.993017, longitude: -79.201078 },
    { latitude: -3.993077, longitude: -79.201013 },
    { latitude: -3.993135, longitude: -79.200965 },
    { latitude: -3.993231, longitude: -79.200891 },
    { latitude: -3.993652, longitude: -79.200434 },
    { latitude: -3.994007, longitude: -79.20044 },
    { latitude: -3.994077, longitude: -79.200445 },
    { latitude: -3.994289, longitude: -79.200437 },
    { latitude: -3.994516, longitude: -79.200405 },
    { latitude: -3.994656, longitude: -79.200388 },
    { latitude: -3.994872, longitude: -79.200368 },
    { latitude: -3.995058, longitude: -79.200354 },
    { latitude: -3.995111, longitude: -79.200357 },
    { latitude: -3.995156, longitude: -79.201328 },
    { latitude: -3.995161, longitude: -79.201403 },
    { latitude: -3.995174, longitude: -79.201821 },
    { latitude: -3.995179, longitude: -79.202175 },
    { latitude: -3.995182, longitude: -79.202255 },
    { latitude: -3.995206, longitude: -79.202502 },
    { latitude: -3.995227, longitude: -79.202703 },
    { latitude: -3.995242, longitude: -79.202815 },
    { latitude: -3.995263, longitude: -79.202991 },
    { latitude: -3.995293, longitude: -79.203194 },
    { latitude: -3.995294, longitude: -79.203234 },
    { latitude: -3.995315, longitude: -79.203423 },
    { latitude: -3.995313, longitude: -79.203555 },
    { latitude: -3.99532, longitude: -79.203579 },
    { latitude: -3.995321, longitude: -79.203654 },
    { latitude: -3.995334, longitude: -79.20418 },
    { latitude: -3.995334, longitude: -79.204217 },
    { latitude: -3.99535, longitude: -79.204462 },
    { latitude: -3.995367, longitude: -79.20479 },
    { latitude: -3.995381, longitude: -79.205023 },
    { latitude: -3.995384, longitude: -79.205149 },
    { latitude: -3.99542, longitude: -79.205146 },
    { latitude: -3.995498, longitude: -79.205139 },
    { latitude: -3.995672, longitude: -79.205118 },
    { latitude: -3.995833, longitude: -79.205104 },
    { latitude: -3.996029, longitude: -79.205083 },
    { latitude: -3.99626, longitude: -79.205059 },
    { latitude: -3.996381, longitude: -79.205046 },
    { latitude: -3.996495, longitude: -79.205033 },
    { latitude: -3.996535, longitude: -79.205027 },
    { latitude: -3.996718, longitude: -79.205 },
    { latitude: -3.996899, longitude: -79.204973 },
    { latitude: -3.997089, longitude: -79.204946 },
    { latitude: -3.99734, longitude: -79.204908 },
    { latitude: -3.997377, longitude: -79.204905 },
    { latitude: -3.997668, longitude: -79.204894 },
    { latitude: -3.997893, longitude: -79.204885 },
    { latitude: -3.998126, longitude: -79.204875 },
    { latitude: -3.998359, longitude: -79.204865 },
    { latitude: -3.998395, longitude: -79.204862 },
    { latitude: -3.998624, longitude: -79.204833 },
    { latitude: -3.998862, longitude: -79.204801 },
    { latitude: -3.999444, longitude: -79.204714 },
    { latitude: -3.999503, longitude: -79.204693 },
    { latitude: -4.000418, longitude: -79.204585 },
    { latitude: -4.00046, longitude: -79.204574 },
    { latitude: -4.00141, longitude: -79.204456 },
    { latitude: -4.001448, longitude: -79.204453 },
    { latitude: -4.002527, longitude: -79.204349 },
    { latitude: -4.002563, longitude: -79.204344 },
    { latitude: -4.002545, longitude: -79.203645 },
    { latitude: -4.002506, longitude: -79.202707 },
    { latitude: -4.002501, longitude: -79.202672 },
    { latitude: -4.002473, longitude: -79.201688 },
    { latitude: -4.002471, longitude: -79.201654 },
    { latitude: -4.00244, longitude: -79.200884 },
    { latitude: -4.002438, longitude: -79.200849 },
    { latitude: -4.002348, longitude: -79.199821 },
    { latitude: -4.002347, longitude: -79.199787 },
    { latitude: -4.002305, longitude: -79.198733 },
    { latitude: -4.002303, longitude: -79.198693 },
    { latitude: -4.002235, longitude: -79.197625 },
    { latitude: -4.002231, longitude: -79.197588 },
    { latitude: -4.002175, longitude: -79.19706 },
    { latitude: -4.002169, longitude: -79.197019 },
    { latitude: -4.002171, longitude: -79.19659 },
    { latitude: -4.002171, longitude: -79.196551 },
    { latitude: -4.002119, longitude: -79.19633 },
    { latitude: -4.002115, longitude: -79.196324 },
    { latitude: -4.002116, longitude: -79.196318 },
    { latitude: -4.002088, longitude: -79.195983 },
    { latitude: -4.002084, longitude: -79.195945 },
    { latitude: -4.002076, longitude: -79.195776 },
    { latitude: -4.002111, longitude: -79.195689 },
    { latitude: -4.002348, longitude: -79.195316 },
    { latitude: -4.00232, longitude: -79.195294 },
    { latitude: -4.002295, longitude: -79.195328 },
    { latitude: -4.002021, longitude: -79.195432 },
    { latitude: -4.00197, longitude: -79.195442 },
    { latitude: -4.001885, longitude: -79.195165 },
    { latitude: -4.001869, longitude: -79.195131 },
    { latitude: -4.001836, longitude: -79.195139 },
    { latitude: -4.001087, longitude: -79.195299 },
    { latitude: -4.001075, longitude: -79.195306 },
    { latitude: -4.000876, longitude: -79.195391 },
    { latitude: -4.000846, longitude: -79.195405 },
    { latitude: -3.999977, longitude: -79.195874 },
    { latitude: -3.999943, longitude: -79.195889 },
    { latitude: -3.998706, longitude: -79.196381 },
    { latitude: -3.998678, longitude: -79.196393 },
    { latitude: -3.997794, longitude: -79.196833 },
    { latitude: -3.997759, longitude: -79.196852 },
    { latitude: -3.997299, longitude: -79.197141 },
    { latitude: -3.997265, longitude: -79.197163 },
    { latitude: -3.996807, longitude: -79.19749 },
    { latitude: -3.996772, longitude: -79.19751 },
    { latitude: -3.995549, longitude: -79.197856 },
    { latitude: -3.9955, longitude: -79.197876 },
    { latitude: -3.995467, longitude: -79.19789 },
    { latitude: -3.995239, longitude: -79.19803 },
    { latitude: -3.995204, longitude: -79.198057 },
    { latitude: -3.995155, longitude: -79.198105 },
    { latitude: -3.99512, longitude: -79.198152 },
    { latitude: -3.995027, longitude: -79.198301 },
    { latitude: -3.994855, longitude: -79.198312 },
    { latitude: -3.994811, longitude: -79.198319 },
    { latitude: -3.994028, longitude: -79.19842 },
    { latitude: -3.994005, longitude: -79.198457 },
    { latitude: -3.993656, longitude: -79.198866 },
    { latitude: -3.99362, longitude: -79.198905 },
    { latitude: -3.992985, longitude: -79.199698 },
    { latitude: -3.992972, longitude: -79.199712 },
    { latitude: -3.992702, longitude: -79.200023 },
    { latitude: -3.992624, longitude: -79.200086 },
    { latitude: -3.992534, longitude: -79.200144 },
    { latitude: -3.992136, longitude: -79.200308 },
    { latitude: -3.992067, longitude: -79.199673 },
    { latitude: -3.992063, longitude: -79.199637 },
    { latitude: -3.991987, longitude: -79.198966 },
    { latitude: -3.991901, longitude: -79.199019 },
    { latitude: -3.991863, longitude: -79.199036 },
  ];

  return (
    <View style={styles.view}>
    <ScrollView>   
      <Image
        style={{width:width,height:300,}}
        source={require("../../../assets/screen_KUICK/moto-min.png")}
        resizeMode="stretch"

      />
      <View style={{padding:10,alignItems:"center"}}>
      <Text style={{fontSize:18, fontWeight:"bold"}}>Promoción válida para la siguiente ruta</Text>
      </View>
      <MapView
        style={{ width: "100%", height: 380 }}
        initialRegion={{
          latitude: -4.005937,
          longitude: -79.200795,
          latitudeDelta: 0.0240516289934446,
          longitudeDelta: 0.00009458134174347,
        }}
      >
        <Polygon
          fillColor={"rgba(100,100,200,0.3)"}
          coordinates={coordenadas}
        />
      </MapView>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
