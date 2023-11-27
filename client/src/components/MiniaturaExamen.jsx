import DetalleExamen from "./DetalleExamen";
import { useState } from "react";
import "./MiniaturaExamen.css";
import { useGetPacienteIdQuery } from "../features/pacientes/pacientesApiAlice";

function MiniaturaExamen(prop) {
  const [buttonPopup, setButtonPopup] = useState(false);

  const { data: paciente, isSuccess } = useGetPacienteIdQuery(prop.pacienteid);

  let paciente_nombre;
  if (isSuccess) {
    paciente_nombre = paciente[0].nombre;
  }

  //del prop viene el nombre, medico derivante y id del examen para la consulta del detalle
  return (
    <div className="miniatura-examen">
      <button onClick={() => setButtonPopup(true)} className="botoncito">
        <h4>Paciente: {paciente_nombre}</h4>
      </button>
      <DetalleExamen
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        examenid={prop.examenid}
        nombre_paciente={paciente_nombre}
      />
    </div>
  );
}

export default MiniaturaExamen;
