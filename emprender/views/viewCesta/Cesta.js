import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Footer,
  FooterTab,
  View,
  Button,
} from "native-base";
import { ProgressDialog } from "react-native-simple-dialogs";
import { CheckBox, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as firebaseAuth from "firebase";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications';
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Toast from "react-native-easy-toast";

import globalStyles from "../../styles/global";
import firebase from "../../firebase";
import PedidoContext from "../../context/pedidos/pedidosContext";
import FirebaseContext from "../../context/firebase/firebaseContext";
import ModalView from "../../components/ui/Modal";
import ModalF from "../../components/ui/Modal";

const GOOGLE_MAPS_APIKEY = "AIzaSyBorx9FPfjN0JV4DQeL9BhzBd0vW4wB55I";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Cesta() {
  //notificaciones
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  ////
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [loadCosto, setLoadCosto] = useState(false);
  const [location, setLocation] = useState(null);
  //modal de "recuerda"
  const [isVisible, setIsVisible] = useState(false);
  const [btnSolicitud, setBtnSolicitud] = useState(false);
  const toastRef = useRef();
  //maps
  const [newLocation, setNewLocation] = useState(null);

  const [costoTotal, setCostoTotal] = useState(0);
  const [check, setCheck] = useState(true);
  
  const [arrValor, setArrLoc] = useState(false);

  //token motorizado
  const [tokenMotorizados, setTokenMoto] = useState([]);

  /////
  const navigation = useNavigation();

  //maps

  //context de pedido
  const {
    pedido,
    total,
    mostrarResumen,
    eliminarProducto,
    pedidoRealizado,
    ciudad,
  } = useContext(PedidoContext);
  const { obtenerFactura, factura } = useContext(FirebaseContext);

  useEffect(() => {
    obtenerFactura(firebaseAuth.auth().currentUser.phoneNumber);
    //notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response);
    });
    //tokens moto
    firebase.db.collection("tokenmoto").onSnapshot(manejarSnapshot);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    calcularTotal();
    setNewLocation(null);
  }, [pedido]);

  var arrLocales = [];

  function manejarSnapshot(snapshot) {
    var arrTocken = [];
    let token = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    if (token) {
      for (let key in token) {
        if (token[key].ciudad === ciudad) {
          arrTocken.push(token[key].token);
        }
      }
      setTokenMoto(arrTocken);
    }
  }


  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => (parseFloat(nuevoTotal) + parseFloat(articulo.total)).toFixed(2),
      0
    );

    mostrarResumen(nuevoTotal);
  };
  const recuerda = () => {
    return (
      <ModalView isVisible={isVisible} setIsVisible={setIsVisible}>
        <View style={styles.desti2}>
          <Image
            style={styles.desti}
            source={require("../../../assets/Kuick/kuik_loading/GraciasporPreferirnos-min.png")}
          />
          {!btnSolicitud ? (
            <Button
            full
              onPress={() => {
                setBtnSolicitud(true);
                setIsVisible(false);
                navigation.navigate("misPedidos");
              }}
              style={styles.botonGracias}
            >
              <Text style={styles.botonGraciasTexto}>Aceptar</Text>
            </Button>
          ) : (
            <Button full disabled={btnSolicitud} style={styles.botonGracias}>
              <ActivityIndicator color="#000" />
            </Button>
          )}
        </View>
      </ModalView>
    );
  };
  //consulta todos los tokens de motorizados
  const enviarNotificacion = async () => {
    await sendPushNotification(tokenMotorizados);
    {/*
    const message = {
      to: tokenMotorizados,
      sound: "default",
      title: "Nueva orden",
      body: "Se segistró una nueva orden por favor revísala!",
      data: { data: "goes here" },
      android: {
        channelId: "chat-messages", //and this
      },
    };
    let response = fetch("");
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });*/}
  };
  //guardar la solicitud en la bdd
  const enviarDatos = async () => {
    setIsVisible(true);
    setBtnSolicitud(true);
    const pedidoObj = {
      completado: false,
      totalOrden: parseFloat(total).toFixed(2),
      orden: pedido,
      creado: new Date(),
      gps: location,
      usuario: firebaseAuth.auth().currentUser.uid,
      cubiertos: check,
      totalTranporte: Number(costoTotal),
      celular: firebaseAuth.auth().currentUser.phoneNumber,
      boton: true,
      token: expoPushToken,
      ciudad: ciudad,
      comentario: true,
      factura: factura,
    };
    //escribir el pedido en firebase
    try {
      const pedido = await firebase.db.collection("ordenes").add(pedidoObj);
      enviarNotificacion();
      pedidoRealizado(pedido.id);
    } catch (error) {
      console.log(error);
      setIsVisible(false);
    }
    setBtnSolicitud(false);
    setArrLoc(false);
    setNewLocation(null);
  };
  //funcion redireccionar a progreso de pedido
  const progresoPedido = () => {
    Alert.alert(
      "Agrega una ubicación",
      "Necesitamos una ubicación para poderte enviar tu orden",
      [
        {
          text: "Aceptar",
          onPress: () => {
            setIsVisibleMap(true);
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };
  //consulta si esta deacuerdo con la tarifa para proceder a guardar el pedido

  //elimina un producto del pedido
  const confirmarEliminacion = (id) => {
    Alert.alert("Eliminar", "Deseas eliminar este articulo de la lista?", [
      {
        text: "Confirmar",
        onPress: () => {
          //eliminar del state
          eliminarProducto(id);

          //calcular
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const addLocal = (distancia, nombre, i, ubiloc) => {
    arrLocales.push(distancia);

    let sinRepetidos = arrLocales.filter(
      (valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
    );
    let valor = 0;
    sinRepetidos.map((dato, index) => {
      if (dato < 1.7) {
        valor = parseFloat(valor + 0.5);
      } else {
        let resta = parseFloat((dato - 1.7) * 0.48 + 0.5);
        try {
          //var conDecimal = resta.toFixed(2);
          //valor = valor + conDecimal;
          valor = parseFloat(valor + resta);
        } catch (e) {
          valor = parseFloat(valor + resta);
        }
      }
    });
    setCostoTotal(valor.toFixed(2));
    console.log(sinRepetidos);
    setLoadCosto(false);
  };

  var arreglo = [];
  const insctruccionesGG = (inst, i) => {
    pedido[i].instruccion = inst;
   
  };

    
  return (
    <Container>
      {pedido.length === 0 ? (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <Image
            source={require("../../../assets/Kuick/Nohaynadacarrito-min.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "auto", flex: 1, marginTop: 10 }}
          />
        </View>
      ) : (
        <>
          <Image
            source={require("../../../assets/screen_KUICK/bienv-min.png")}
            style={{ width: "100%", position: "absolute", height: "100%" }}
          />
          <Content style={globalStyles.contenedor}>
            <View style={{ margin: 10 }}>
              <CheckBox
                center
                title="Incluir cubiertos"
                checked={check}
                onPress={() => setCheck(!check)}
              />
            </View>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                margin: 5,
                padding: 5,
                borderRadius: 20,
              }}
            >
              {/* lista de todos los pedidos */}
              {pedido.map((producto, i) => {
                const {
                  cantidad,
                  nombre,
                  imagen,
                  id,
                  precio,
                  total,
                  ubiloc,
                  nomlocal,
                } = producto;

                return (
                  <View key={i}>
                    <List key={id + i}>
                      <ListItem thumbnail>
                        <Left>
                          <Thumbnail
                            large
                            square
                            source={
                              imagen
                                ? { uri: imagen[0] }
                                : require("../../../assets/img/noimage.png")
                            }
                          />
                        </Left>
                        <Body>
                          <Text style={{ fontWeight: "bold" }}>{nombre}</Text>
                          <Text>Cantidad: {cantidad}</Text>
                          <Text>Precio unitario: $ {precio}</Text>
                          <Text style={{ fontWeight: "bold" }}>
                            Precio total: $ {total}
                          </Text>
                          <View
                            style={{
                              margin: 2,
                              marginRight: 7,
                              padding: 1,
                              borderWidth: 1,
                              borderRadius: 5,
                              borderColor: "grey",
                            }}
                          >
                            <Text style={{ fontWeight: "bold", color: "red" }}>
                              Instrucciones especiales
                            </Text>
                            <Input
                              placeholder="Escribe aquí"
                              placeholderTextColor="black"
                              //containerStyle={styles.input}
                              rightIcon={{
                                type: "material-community",
                                name: "pen",
                                color: "black",
                              }}
                              //defaultValue={email || ""}

                              onChange={(e) => {
                                insctruccionesGG(e.nativeEvent.text, i);
                              }}
                              //errorMessage={error.email}
                            />
                          </View>
                          {arrValor ? (
                            <></>
                          ) : (
                            <Button
                              full
                              onPress={() => confirmarEliminacion(id)}
                            >
                              <Text style={{ color: "white" }}> Eliminar</Text>
                            </Button>
                          )}
                        </Body>
                      </ListItem>
                    </List>

                    <View>
                      <MapViewDirections
                        key={i}
                        origin={ubiloc}
                        destination={newLocation}
                        onReady={(result) => {
                          addLocal(result.distance, nomlocal, i, ubiloc);
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
            {/* Resumen del valor a pagar */}
            <Button full onPress={() => navigation.navigate("deposito")}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Transferencia
              </Text>
            </Button>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                margin: 5,
                padding: 5,
                borderRadius: 20,
              }}
            >
              <Text style={globalStyles.cantidad}>Pedido: $ {parseFloat(total).toFixed(2)}</Text>
              {arrValor ? (
                <>
                  <Text style={globalStyles.cantidad}>
                    Transporte: $ {costoTotal}
                  </Text>

                  <Text style={globalStyles.cantidad}>
                    Total a pagar: ${" "}
                    {(parseFloat(costoTotal) + parseFloat(total)).toFixed(2)}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
           
          </Content>
          <ProgressDialog
            visible={loadCosto}
            title="Calculando"
            message="Por favor espere..."
          />

          {/*boton pie del screen */}
          <Footer>
            <FooterTab>
              {arrValor ? (
                <>
                  <Button
                    style={{ backgroundColor: "#fe2241" }}
                    onPress={() => setArrLoc(false)}
                  >
                    <Text style={globalStyles.botonTexto}>Cancelar</Text>
                  </Button>
                  <Button
                  style={{ backgroundColor: "blue" }}
                    disabled={newLocation === null}
                    onPress={() => enviarDatos()}
                  >
                    <Text style={globalStyles.botonTexto}>Pedir Orden</Text>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ backgroundColor: "#fe2241" }}
                    onPress={() => navigation.navigate("principalG")}
                  >
                    <Text style={globalStyles.botonTexto}>Seguir pidiendo</Text>
                  </Button>
                  <Button
                  style={{ backgroundColor: "blue" }}
                    onPress={() => {
                      setIsVisibleMap(true);
                    }}
                  >
                    <Text style={globalStyles.botonTexto}>
                      Confirmar ubicación
                    </Text>
                  </Button>
                </>
              )}
            </FooterTab>
          </Footer>
        </>
      )}

      {/*Toas para la peticion del mapa */}
      <Toast ref={toastRef} position="center" opacit={0.9} />

      {/*modal del mapa */}
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
        location={location}
        setLocation={setLocation}
        setLoadCosto={setLoadCosto}
        setNewLocation={setNewLocation}
        setArrLoc={setArrLoc}
      />
      {recuerda()}
    </Container>
  );
}

function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    toastRef,
    location,
    setLocation,
    setNewLocation,
    setArrLoc,
    setLoadCosto,
  } = props;

  useEffect(() => {
    (async () => {
      const resultPermisos = await Permissions.askAsync(Permissions.LOCATION);
      const statusPermisos = resultPermisos.permissions.location.status;
      if (statusPermisos !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localizacion para ordenar un pedido",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    toastRef.current.show("Localizacion guardada correctamente");
    setArrLoc(true);
    if (location === null) {
      alert("Error al cargar la hubicación");
    } else {
      setLoadCosto(true);
    }
    setNewLocation(location);
    setIsVisibleMap(false);
    //setIsVisible(true);
  };

  return (
    <ModalF isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View style={{ width: "100%", height: 550 }}>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            ></MapView.Marker>
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            onPress={confirmLocation}
            rounded
            style={{ paddingHorizontal: 10, marginRight: 15 }}
          >
            <Text style={[globalStyles.botonTexto, { fontSize: 15 }]}>
              Confirmar
            </Text>
          </Button>
          <Button
            onPress={() => setIsVisibleMap(false)}
            danger
            rounded
            style={{ paddingHorizontal: 10, marginLeft: 15 }}
          >
            <Text style={[globalStyles.botonTexto, { fontSize: 15 }]}>
              Cancelar
            </Text>
          </Button>
        </View>
      </View>
    </ModalF>
  );
}


async function sendPushNotification(tokenMotorizados) {
  const message = {
    to: tokenMotorizados,
    sound: "default",
    title: "Nueva orden",
    body: "Se segistró una nueva orden por favor revísala!",
    data: { data: "Kuick" },
    android: {
      channelId: "chat-messages", //and this
    },
  };
  
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });


}

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
 

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('chat-messages', {
      name: 'chat-messages',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 200,
  },
  botonGraciasTexto: { fontSize: 15, color: "red", fontWeight: "bold" },
  botonGracias: {
    backgroundColor: "white",
    bottom: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  desti: {
    width: "100%",
    height: 530,
    alignItems: "center",
  },
  desti2: {
    width: "100%",
    height: 530,
  },
  btnSeguirPidiendo: {
    position: "absolute",
    bottom: 65,
    right: "33%",
  },
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddProducto: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 500,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
