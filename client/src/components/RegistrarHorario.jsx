import React from "react";
import "./ExpandirBloqueHorario.css";
import { useState, useEffect } from "react";
import { useAddNewPacienteMutation } from "../features/pacientes/pacientesApiAlice";
import { useNavigate } from "react-router-dom";

const RegistrarHorario = (props) => {
  const [addNewPaciente, { isLoading, isSuccess, isError, error }] =
    useAddNewPacienteMutation();

  const navigate = useNavigate();

  const [rut_pac, setRutPac] = useState("");
  const [nombre, setNombre] = useState("");
  const [numero_telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setRutPac("");
      setNombre("");
      setTelefono("");
      setEmail("");
      navigate("/");
    }
  }, [isSuccess, navigate]);
  const onRutChange = (e) => setRutPac(e.target.value);
  const onNombreChange = (e) => setNombre(e.target.value);
  const onTelefonoChange = (e) => setTelefono(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ rut_pac, nombre, numero_telefono, email });
    addNewPaciente({ rut_pac, nombre, numero_telefono, email });
  };
  return props.trigger ? (
    <div className="expandir-horario">
      <div className="expandir-inner">
        <button
          className="close-button"
          type="bvutton"
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
              <input
                type="text"
                id="rut_pac"
                name="rut_pac"
                placeholder="Ingrese RUT del paciente"
                value={rut_pac}
                autoComplete="off"
                onChange={onRutChange}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese nombre del paciente"
                autoComplete="off"
                value={nombre}
                onChange={onNombreChange}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Ingrese correo electrónico del paciente"
                autoComplete="off"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="numero_telefono">Teléfono:</label>
              <input
                type="text"
                id="numero_telefono"
                name="numero_telefono"
                placeholder="Ingrese número del paciente"
                autoComplete="off"
                value={numero_telefono}
                onChange={onTelefonoChange}
                required
              />
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

export default RegistrarHorario;
