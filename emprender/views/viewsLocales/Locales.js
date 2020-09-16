import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

import PedidoContext from "../../context/pedidos/pedidosContext";
import FirebaseContext from "../../context/firebase/firebaseContext";
import CarouseInterface from "../../components/ui/CarouseInterface";
import CarouselImagenes from "../../components/ui/CarouselImagenes";
import Loading from "../../components/ui/Loading";

const screenWidth = Dimensions.get("window").width;

export default function Locales(props) {
  const { route } = props;
  const { params } = route;
  const { categoria, subcat } = params;
  //para guardar el local en el context
  const { ciudad, seleccionarLocal } = useContext(PedidoContext);
  //context de firebase
  const { menu, obtenerRestaurantes, consultaimagenes, carrouImg } = useContext(
    FirebaseContext
  );
  //navegacion
  const navigation = useNavigation();
  //mostrar modal
  const [loading, setLoading] = useState(true);
  //guardar la subcategoria
  const [categ, setCateg] = useState(null); //props.route.params.subcat[0]
  //guardar la subcategoria
  const [subCateg, setSubCateg] = useState(subcat);
  //categorias locales
  const [categLoc, setCategLoc] = useState(categoria);

  //cuando se inicia solicita los locales

  useEffect(() => {
    obtenerRestaurantes(ciudad);
    consultaimagenes(ciudad, categoria);
  }, []);

  const textoWhats = () => {
    if (
      categ === "Farmacias" ||
      categ === "Peluquería Canina" ||
      categ === "Emergencias Caninas" ||
      categ === "Librería" ||
      categ === "Motorizados" ||
      categ === "Supermercados"
    ) {
      return (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              En 🚩 KUICK 🚩 pensamos en tu comodidad, detalla lo que necesites
              en el mensaje de WhatsApp 📲 y con gusto te ayudaremos 😉👍
            </Text>
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/screen_KUICK/fondo_opt.jpg")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        <ScrollView>
          <View>
            <View>
              <CarouselImagenes
                setLoading={setLoading}
                menu={menu}
                navigation={navigation}
                seleccionarLocal={seleccionarLocal}
                categLoc={categLoc}
              />
              <View style={{ backgroundColor: "red", paddingVertical: 5 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Promociones
                </Text>
              </View>
              <View style={styles.viewPadreSliders}>
                <View style={styles.barraCat}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: 15,
                    }}
                  >
                    Categorías
                  </Text>
                </View>
                <View style={styles.cardSliders}>
                  {/* <Text style={styles.titleSliders}>Categorías </Text> */}
                  <View>
                    <CarouseInterface setCateg={setCateg} subCateg={subCateg} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              {textoWhats()}
              <FoundRestaurants
                menu={menu}
                navigation={navigation}
                seleccionarLocal={seleccionarLocal}
                categ={categ}
                subCateg={subCateg}
                carrouImg={carrouImg}
              />
            </View>
            <Loading isVisible={loading} text="Cargando..." />
          </View>
        </ScrollView>
        <View>
          <Icon
            reverse
            type="material-community"
            name="magnify"
            color="#fe2241"
            containerStyle={styles.btnBuscar}
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

function FoundRestaurants(props) {
  var hours = new Date().getHours();
  var min = new Date().getMinutes();
  var hora = hours + "." + min;
  const {
    menu,
    navigation,
    seleccionarLocal,
    categ,
    subCateg,
    carrouImg,
  } = props;

  const selectOrCall = (producto, name, telefono) => {
    //seleccionar el id del local
    if (
      categ !== "Farmacias" &&
      categ !== "Peluquería Canina" &&
      categ !== "Emergencias Caninas" &&
      categ !== "Librería" &&
      categ !== "Motorizados" &&
      categ !== "Supermercados"
    ) {
      seleccionarLocal(producto);
      navigation.navigate("listaProductos");
    } else {
      if (
        categ !== "Farmacias" &&
        categ !== "Peluquería Canina" &&
        categ !== "Emergencias Caninas" &&
        categ !== "Librería" &&
        categ !== "Supermercados"
      ) {
        Linking.openURL("https://wa.me/" + telefono);
      } else {
        if (categ === "Farmacias") {
          let msm =
            "Hola..!!!😃 soy cliente 🚩KUICK🚩,  🏍️ por favor me podrían ayudar con la siguiente receta?";
          Linking.openURL("https://wa.me/593" + telefono + "?text=" + msm);
        } else {
          if (categ === "Librería") {
            let msm =
              "Hola 👋 soy cliente 🚩Kuick 🚩por favor podrian ayudarme con el siguiente pedido 🛴 :";
            Linking.openURL("https://wa.me/593" + telefono + "?text=" + msm);
          } else {
            if (categ === "Peluquería Canina") {
              let msm =
                "Hola...!!!😃 soy cliente 🚩 KUICK  🚩 mi mascota necesita un cambio de look  🐩🐕‍🦺🦮 me puede ayudar agendando una cita y con el transporte? \n Le adjunto mi ubicación 📍y la foto de mi mascota😊Se llama:";
              Linking.openURL("https://wa.me/593" + telefono + "?text=" + msm);
            } else {
              if (categ === "Emergencias Caninas") {
                let msm =
                  "Hola...!!! Soy cliente 🚩KUICK🚩 mi mascota no se siente bien 😔. \n Le adjunto mi ubicación 📍 \n Tiene los siguientes síntomas:";
                Linking.openURL(
                  "https://wa.me/593" + telefono + "?text=" + msm
                );
              } else {
                if (categ === "Supermercados") {
                  let msm =
                    "Hola 👋 soy cliente 🚩Kuick 🚩por favor me podrían ayudarme con los siguientes productos:";
                  Linking.openURL(
                    "https://wa.me/593" + telefono + "?text=" + msm
                  );
                }
              }
            }
          }
        }
      }
    }
  };
  const categorias = (
    categoria,
    address,
    name,
    horaApertura,
    horaCierre,
    horario,
    images,
    producto,
    telefono,
    abierto,
    i,
    id
  ) => {
    if (abierto === true) {
      var horaAperturaNueva = horaApertura;
      var horaCierreNueva = horaCierre;
      horaAperturaNueva = horaAperturaNueva.replace(".", ":");
      horaCierreNueva = horaCierreNueva.replace(".", ":");
      if (categoria === categ) {
        return (
          <View style={{ flex: 1, marginVertical: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              // navegar al local seleccionado
              onPress={() => {
                selectOrCall(producto, name, telefono);
              }}
            >
              <View style={[styles.restaurantCard]}>
                <View style={styles.cardRestaurant}>
                  <Image
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator color="#000" />}
                    // si la uri no tiene valor muestra la imagen
                    source={{ uri: images[0] }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.favorite}>
                  <Icon
                    reverse
                    type="material-community"
                    name="lightbulb-on"
                    color={"black"}
                    underlayColor="transparent"
                    containerStyle={{
                      backgroundColor: "white",
                      borderRadius: 100,
                      marginBottom: -6,
                    }}
                  />
                  <Text style={{ color: "black" }}>Abierto</Text>
                  {/*
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Horario:{horaAperturaNueva}-{horaCierreNueva}
                  </Text>*/}
                </View>

                <View style={styles.info}>
                  <View style={{ flexDirection: "row" }}>
                    <Icon type="FontAwesome5" name="store" color="#fe2241" />
                    <Text style={styles.name}>{name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginLeft: 3 }}>
                    <Icon
                      size={18}
                      type="FontAwesome5"
                      name="map"
                      color="grey"
                    />
                    <Text style={styles.direccion}>{address}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        if (categ === null && carrouImg) {
          if (categoria !== "Motorizados" && categoria !== "Farmacias") {
            return carrouImg.map((data) => {
              if (id === data.idlocal) {
                return (
                  <View
                    style={{
                      backgroundColor: "white",
                      flex: 1,
                      marginVertical: 10,
                    }}
                    key={i}
                  >
                    <View style={{ paddingVertical: 5 }}>
                      <Text
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >⭐⭐⭐ Local destacado ⭐⭐⭐
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      // navegar al local seleccionado
                      onPress={() => {
                        //seleccionar el id del local
                        seleccionarLocal(producto);
                        navigation.navigate("listaProductos");
                      }}
                    >
                      <View style={[styles.restaurantCard]}>
                        <View style={styles.cardRestaurant}>
                          <Image
                            style={styles.image}
                            PlaceholderContent={
                              <ActivityIndicator color="#fff" />
                            }
                            // si la uri no tiene valor muestra la imagen
                            source={{ uri: images[0] }}
                          />
                        </View>
                        <View style={styles.favorite}>
                          <Icon
                            reverse
                            type="material-community"
                            name="lightbulb-on"
                            color={"black"}
                            underlayColor="transparent"
                            containerStyle={{
                              backgroundColor: "white",
                              borderRadius: 100,
                              marginBottom: -6,
                            }}
                          />
                          <Text style={{ color: "black" }}>Abierto</Text>
                        </View>

                        <View style={styles.info}>
                          <View style={{ flexDirection: "row" }}>
                            <Icon
                              type="FontAwesome5"
                              name="store"
                              color="#fe2241"
                            />
                            <Text style={styles.name}>{name}</Text>
                          </View>
                          <View style={{ flexDirection: "row", marginLeft: 3 }}>
                            <Icon
                              size={18}
                              type="FontAwesome5"
                              name="map"
                              color="grey"
                            />
                            <Text style={styles.direccion}>{address}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            });
          } else {
            return <></>;
          }
        }
      }
    }
  };
  return (
    <>
      {menu.map((producto, i) => {
        //reestructuring de los locales
        const {
          images,
          name,
          address,
          categoria,
          horaApertura,
          horaCierre,
          horario,
          telefono,
          abierto,
          id,
        } = producto;

        return (
          <View key={i}>
            {categorias(
              categoria,
              address,
              name,
              horaApertura,
              horaCierre,
              horario,
              images,
              producto,
              telefono,
              abierto,
              i,
              id
            )}
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  favorite: {
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    bottom: 5,
    right: 25,
  },
  info: {
    marginLeft: 10,
    width: "60%",
  },
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 17,
  },
  direccion: {
    marginLeft: 3,
    color: "grey",
    fontSize: 12,
    textTransform: "lowercase",
  },
  //card restaurant
  restaurantCard: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  cardRestaurant: {
    flexDirection: "row",
  },
  image: {
    width: screenWidth,
    height: 150,
    flex: 1,
  },
  ///
  btnBuscar: {
    position: "absolute",
    bottom: 25,
    right: 5,
  },
  //Card de categorias
  viewPadreSliders: {
    marginTop: 50,
  },
  cardSliders: {
    backgroundColor: "#fff",
    flex: 1,
    borderColor: "#8697a5",
    borderWidth: 0,
    borderRadius: 20,
    //sombra
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  barraCat: {
    marginTop: -40,
    backgroundColor: "red",
    position: "absolute",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 8,
    paddingStart: 30,
  },
  //termina barra categoria
  titleSliders: {
    position: "absolute",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    paddingLeft: 8,
    marginStart: 40,
    // marginTop: -8,
    fontSize: 10,
  },
  card: {
    paddingStart: 5,
    paddingTop: 8,
    flexDirection: "row",
    backgroundColor: "red",
    paddingBottom: 13,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
    borderRadius: 7,
  },
  imagen: {
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  colorText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  textoPrecio: {
    color: "#fe2241",
    fontWeight: "bold",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 5,
    width: "60%",
    padding: 5,
    marginLeft: 50,
    textAlign: "center",
  },
});
