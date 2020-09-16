import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';
//constext
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {
  //context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  //context de pedido
  const {seleccionarProducto} = useContext(PedidoContext);
  //hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separador}>
            <Text style={styles.separadorText}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separador}>
          <Text style={styles.separadorText}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map((producto, i) => {
            const {
              imagen,
              nombre,
              descripcion,
              categoria,
              precio,
              id,
            } = producto;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    //eliminar propiedades
                    const {existencia, ...producto2} = producto;
                    seleccionarProducto(producto2);
                    navigation.navigate('DetallePlatillo');
                  }}>
                  <Thumbnail large source={{uri: imagen}} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note numberOfLines={3}>
                      {descripcion}
                    </Text>
                    <Text>Precio: $ {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
  },
  separadorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default Menu;
