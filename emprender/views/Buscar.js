import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import PedidoContext from "../context/pedidos/pedidosContext";
import globalSyle from "../styles/global";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const { seleccionarLocal } = useContext(PedidoContext);
  //buscar el local por el nombre
  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM restaurants WHERE search LIKE '${search.toLowerCase()}%' OR name LIKE '${search}%'`)
        .then((response) => {
          setRestaurants(response);
        });
    }
  }, [search]);

  return (
    <View style={{ marginTop: "9%",flex:1, backgroundColor:"#fff" }}>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme
      />
      {/*si no encuentra locales presenta el noFound */}
      {restaurants.length === 0 ? (
        <NoFoundRestaurants />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant
              restaurant={restaurant}
              navigation={navigation}
              seleccionarLocal={seleccionarLocal}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/Kuick/NoencontraronResultados-min.png")}
        resizeMode="cover"
        style={globalSyle.imagenBuscador}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation, seleccionarLocal } = props;
  const { id, name, images } = restaurant.item;

  return (
    <ListItem
      title={name}
      leftAvatar={{
        source: images[0]
          ? { uri: images[0] }
          : require("../../assets/Kuick/NoencontraronResultados-min.png"),
      }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() => {
        navigation.navigate("listaProductos");
        seleccionarLocal(restaurant.item);
      }}
    />
  );
}
function enviarLocal(params, seleccionarLocal) {
  console.log(params.id);
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
  },
});
