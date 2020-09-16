import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/ui/Loading";

//firebase
import * as firebase from "firebase";
import firebaseDB from "../../firebase";

export default function ReviewLocal(props) {
  console.log(props);
  const { navigation, route } = props;
  const { idRestaurant } = route.params;
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addRevew = () => {
    if (!rating) {
      toastRef.current.show("No has dado ninguna putuacion");
    } else if (!review) {
      toastRef.current.show("El comentatio es obligatorio");
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const paylod = {
        idUsuario: user.uid,
        idOrden: idRestaurant,
        review: review,
        rating: rating,
        createAt: new Date(),
      };

      firebaseDB.db
        .collection("comentarios")
        .add(paylod)
        .then(() => {
          firebaseDB.db
            .collection("ordenes")
            .doc(idRestaurant)
            .update({ comentario: false })
            .then(() => {
              setIsLoading(false);
              toastRef.current.show("Comentario enviado... gracias!");
              navigation.navigate("favorites");
            })
            .catch(() => {
              setIsLoading(false);
              toastRef.current.show("Error al enviar el comentario!");
              navigation.navigate("favorites");
            });
        })
        .catch(() => {
          toastRef.current.show("Error al enviar la review");
          setIsLoading(false);
        });
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/screen_KUICK/bienv-min.png")}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Image
        source={require("../../../assets/screen_KUICK/KUICK-min.png")}
        resizeMode="contain"
        style={{ width: "100%",height:180  }}
      />

      <View style={styles.viewBody}>
        <View style={styles.viewRating}>
          <AirbnbRating
            count={4}
            reviews={["Por mejorar", "Normal", "Muy Bueno", "Excelente"]}
            defaultRating={0}
            size={35}
            onFinishRating={(value) => {
              setRating(value);
            }}
          />
        </View>
        <View style={styles.formReview}>
          <Input
            placeholder="Comentario..."
            placeholderTextColor="black"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setReview(e.nativeEvent.text)}
          />
          <Button
            title="Enviar Comentario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={addRevew}
          />
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Loading isVisible={isLoading} text="Enviando comenario" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    padding: 30,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
  },
  viewRating: {
    height: 70,
    marginBottom: 30,
  },
  formReview: {
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 90,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
