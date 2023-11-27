import CrearHorario from "./CrearHorario"
import React, { useState } from "react"

function BotonReservarHora(props) {
  console.log(props)
  const [button, Formulario] = useState(false);
  const getBloque = (isempty) => {
    if (!isempty) {
      return <p>agregar hora</p>;
    } else {
      return <p>+</p>;
    }
  };

  return (
    <><button onClick={() => Formulario(true)}>
      {getBloque(props.isFullyAvailable)}
    </button><CrearHorario trigger={button} setTrigger={Formulario} tipoExamen ={props.tipoExamen} fecha ={props.fecha} bloque ={props.bloque}/></>

  );
}

export default BotonReservarHora;
