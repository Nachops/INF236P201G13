import React from "react";
import "./ExpandirBloqueHorario.css";
import { useState, useEffect } from "react";
import { useAddNewExamenMutation } from "../features/examenes/examenesApiSlice";
import { useGetPacientesQuery } from "../features/pacientes/pacientesApiAlice";

const CrearHorario = (props) => {
  const { data: pacientes, isLoading, isSuccess, isError, error } = useGetPacientesQuery();
  const [addNewExamen, {}] = useAddNewExamenMutation();

  const [pac_id, setPacId] = useState("");

  const onIdChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPacId(values);
  };

  let tipo = props.tipoExamen;
  let fecha = props.fecha;
  let hora_inicio = props.bloque;
  let detalle = "pollos";
  let paciente = pac_id[0];
  let nombre_medico_tratante = "hermanos";
  let motivo_derivacion = "family";
  let sobreescrito = false;

  const submitForm = async (e) => {
    e.preventDefault();
    const wea  = {
        tipo,
        fecha,
        hora_inicio,
        detalle,
        paciente,
        nombre_medico_tratante,
        motivo_derivacion,
        sobreescrito,
      }
    await addNewExamen(wea);
  };
  

  let options;

  if (isSuccess) {
    const wea_limpia = pacientes.ids.map(k => pacientes.entities[k]).map((paciente) => ({
      id: paciente._id,
      nombre: paciente.nombre,
      rut: paciente.rut_pac,
    }));
    
    options = wea_limpia.map((paciente) => {
      return (
        <option key={paciente.id} value={paciente.id}>
          <h4>{paciente.nombre}</h4>
          <h4>{paciente.rut}</h4>
        </option>
      );
    });
  }

  return props.trigger ? (
    <div className="expandir-horario">
      <div className="expandir-inner">
        <button
          className="close-button"
          type="button"
          onClick={() => props.setTrigger(false)}
        >
          {" "}
          cerrar
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <form
            style={{ display: "block", textAlign: "center" }}
            onSubmit={submitForm}
          >
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="rut_pac">RUT:</label>
              <select
                id="rut_pac"
                name="rut_pac"
                multiple={false}
                value={pac_id}
                autoComplete="off"
                onChange={onIdChange}
                required
              >
                {options}
              </select>
            </div>

            <button
              type="submit"
              // onClick={() => {
              //   props.setTrigger(false);
              // }}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CrearHorario;