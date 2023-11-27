import React, { useState } from "react";
import "./bloque-horario.css"; // Asegúrate de ajustar la ruta del archivo CSS según tu estructura de carpetas
import BotonReservarHora from "./BotonReservarHora";
import ExpandirBloqueHorario from "./ExpandirBloqueHorario";

function MiniaturaBloqueHorario({
  disponibilidadInicial,
  disponilidadTotal,
  fecha,
  bloque,
  tipoExamen
}) {
  console.log(tipoExamen)
  const [buttonPopup, setHorariosVisible] = useState(false);
  const [horasDisponibles, setHoraDisponible] = useState(disponibilidadInicial);
  const [horasOcupadas, setHOrasOcupadas] = useState(
    disponilidadTotal - disponibilidadInicial
  );

  function expandirHorarios() {
    setHorariosVisible(true);
  }


  return (
    <div className="bloque-horario">
      <p>Horas disponibles: {horasDisponibles}</p>
      <p>Horas ocupadas: {horasOcupadas}</p>
      <div className="buttons-block">
        <BotonReservarHora
          isFullyAvailable={false}
          className="boton-agendar"
          fecha = {fecha}
          bloque = {bloque}
          tipoExamen = {tipoExamen}
        ></BotonReservarHora>
        <button
          className="boton-expandir"
          onClick={() => setHorariosVisible(true)}
        >
          Expandir
        </button>
        <ExpandirBloqueHorario
          trigger={buttonPopup}
          setTrigger={setHorariosVisible}
          fecha={fecha}
          bloque={bloque}
        ></ExpandirBloqueHorario>
      </div>
    </div>
  );
}

export default MiniaturaBloqueHorario;
