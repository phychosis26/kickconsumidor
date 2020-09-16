import React, {  useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, CheckBox } from "react-native-elements";

import PedidoContext from "../../context/pedidos/pedidosContext";

export default function ListItemProductos(props) {
  const { item, index, navigation, categoria, checked, setChecked } = props;

  const { seleccionarProducto } = useContext(PedidoContext);

  const checkedData = (newSelect) => {
    setChecked(newSelect);
    seleccionar();
  };
  const seleccionar = () => {
    seleccionarProducto(item);
  };

  const lista = () => {
    if (item.categoria === categoria) {
      return (
        <ListItem
          key={index}
          bottomDivider
          title={item.nombre}
          subtitle={item.descripcion}
          leftAvatar={{
            source: { uri: item.imagen[0] },
          }}
          onPress={() => checkedData(item.nombre)}
          rightElement={
            <CheckBox
              checked={item.nombre !== checked ? false : true}
              onPress={() => {
                checkedData(item.nombre);
              }}
            />
          }
        />
      );
    }
  };

  return <View>{lista()}</View>;
}

const styles = StyleSheet.create({});
