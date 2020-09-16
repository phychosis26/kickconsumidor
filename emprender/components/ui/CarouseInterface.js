import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from "react-native";

import { map } from "lodash";
//categ es la subcateg-....
export default function CarouselInterface(props) {
  const { setCateg, subCateg } = props;
  //seleccion de la categoria
  const [select, setSelect] = useState();

  const onChangeSelect = (newSelect) => {
    setSelect(newSelect);
    seleccionar(newSelect);
  };
  const seleccionar = (cat) => {
    setCateg(cat);
  };

  return (
    <View style={styles.genres}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genreList}
      >
        {subCateg.map((catg, i) => (
          <TouchableOpacity
          activeOpacity={1}
          key={i}
          // navegar al local seleccionado
          onPress={() => onChangeSelect(catg)}>
          <View
            style={[
              styles.restaurant,
              { borderColor: catg != select ? "#000" : "#000" },
            ]}
           
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor: catg != select ? "#c9c9c9" : "#fe2241",
                },
              ]}
            >
              <Text
                style={[
                  styles.texto,
                  {
                    fontWeight: catg != select ? "normal" : "bold",
                    color: catg != select ? "#000" : "#fff",
                  },
                ]}
                
              >
                {catg}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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
