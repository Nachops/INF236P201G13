import React from "react";
import "./DetalleExamen.css";
import { useGetExamenIdQuery } from "../features/examenes/examenesApiSlice";

function DetalleExamen(props) {
  const { data: examen, isSuccess } = useGetExamenIdQuery(props.examenid);

  let content;

  if (isSuccess) {
    let info_examen = examen[0];

    content = (
      <div>
        <h3>Paciente: {props.nombre_paciente}</h3>
        <h3>Tipo: {info_examen.tipo}</h3>
        <h4>Medico Tratante: {info_examen.nombre_medico_tratante}</h4>
        <h4>Bloque: {info_examen.hora_inicio}</h4>
        <br />
        <h4>Detalle:</h4>
        <p>{info_examen.detalle}</p>
        <h4>Motivo Derivacion</h4>
        <p>{info_examen.motivo_derivacion}</p>
      </div>
    );
  }

  return props.trigger ? (
    <div className="detalle-examen">
      <div className="detalle-inner">
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
        >
          cerrar
        </button>
        <h2>Detalle examen</h2>
        <div className="detalle-contenido">{content}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DetalleExamen;
