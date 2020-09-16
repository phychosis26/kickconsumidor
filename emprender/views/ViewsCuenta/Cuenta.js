import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import UsuarioGuest from '../../views/ViewsCuenta/UsuarioGuest';
import UsuarioLogged from '../../views/ViewsCuenta/UsuarioLogged';
//pantalla de carga
import Loading from '../../components/ui/Loading';

//primera pantalla de Cuenta
export default function Cuenta() {
  //primer estado
  const [login, setLogin] = useState(null);
  //consultar si esta logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);
  //para saber si esta logueado en un tiempo de peticion demorado
  if (login === null) return <Loading isVisible={true} text="Cargando..." />;
  // regresa logged si esta logueado o guest si no lo esta
  return login ? <UsuarioLogged /> : <UsuarioGuest />;
}
