import React from "react";
import "./ExpandirBloqueHorario.css";
import MiniaturaExamen from "./MiniaturaExamen";
import { useGetExamenesFechaBloqueQuery } from "../features/examenes/examenesApiSlice";

function ExpandirBloqueHorario(props) {
  let fecha = props.fecha;
  let bloque = props.bloque;
  const {
    data: examenes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExamenesFechaBloqueQuery({ fecha, bloque });

  let content;

  if (isSuccess) {
    const examenes_limpio = examenes.map((examen) => ({
      id: examen._id,
      paciente: examen.paciente,
      medicotratante: examen.nombre_medico_tratante,
    }));
    content = (
      <div className="bloque-contenido">
        {examenes_limpio.map((examen) => (
          <MiniaturaExamen pacienteid={examen.paciente} examenid={examen.id} />
        ))}
      </div>
    );
  }

  return props.trigger ? (
    <div className="expandir-horario">
      <div className="expandir-inner">
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
        >
          cerrar
        </button>
        <h2>Bloque horario {props.bloque}</h2>
        {content}
      </div>
    </div>
  ) : (
    ""
  );
}

export default ExpandirBloqueHorario;
