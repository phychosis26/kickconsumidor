export function validarEmail(email) {
  //expresion regular para validar email
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validarTelefono(phone) {
  let number = phone;
  if (number.charAt(0) === "0") {
    number = number.substr(1);
    number = "+593" + number;
  }
  const regexp = /^\+\d{12}$/;

  return regexp.test(number) ? number : 0;
}
