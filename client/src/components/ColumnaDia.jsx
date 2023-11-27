import MiniaturaBloqueHorario from "./MiniaturaBloqueHorario";
import BotonReservarHora from "./BotonReservarHora";
import "./ColumnaDia.css";
import { useGetExamenesFechaQuery } from "../features/examenes/examenesApiSlice";

function ColumnaDia(prop) {
  //datos falsos que en teoria se reciben
  //si hay 8 bloques totales
  let bloques_totales;
  switch (prop.tipoExamen) {
    case "radiografia":
    case "ecografia":
      bloques_totales = [
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
      ];
      break;
    case "scanner":
      bloques_totales = ["8:30", "9:30", "10:30"];
      break;
    case "resonancia":
      bloques_totales = ["8:30", "10:00", "11:30"];
      break;
    default:
      bloques_totales = ["8:00"];
  }

  //aqui idealmente agarraria esto con la fecha desde la base de datos
  // const bloques_usados = ["8:30", "11:00"];

  // const getBloque = (index) => {
  //   if (bloques_usados.includes(index)) {
  //     return (
  //       <MiniaturaBloqueHorario
  //         disponibilidadInicial={5}
  //         disponilidadTotal={8}
  //       />
  //     );
  //   } else {
  //     return (
  //       <MiniaturaBloqueHorario
  //         disponibilidadInicial={8}
  //         disponilidadTotal={8}
  //       />
  //     );
  //   }
  // };

  const {
    data: examenes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExamenesFechaQuery(prop.fecha);

  let content;

  if (isSuccess) {
    const sumOfBloque = (bloque) => {
      let suma = 0;
      examenes.forEach((examen) => {
        if (examen.hora_inicio == bloque) suma++;
      });
      return suma;
    };

    const bloques_usados = bloques_totales.map((bloque) => ({
      block: bloque,
      qnt: sumOfBloque(bloque),
    }));
    const getBloque = (index) => {
      let posInArray;
      bloques_usados.forEach((element) => {
        if (element.block == index) {
          posInArray = element;
        }
      });

      return (
        <MiniaturaBloqueHorario
          disponibilidadInicial={8 - posInArray.qnt}
          disponilidadTotal={8}
          fecha={prop.fecha}
          bloque={index}
          tipoExamen = {prop.tipoExamen}
        />
      );
    };

    content = (
      <div className="columna-dia">
        <ul className="lista-horarios">
          {bloques_totales.map((item) => (
            <li key={item} className="block-container">
              {getBloque(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return content;
}

export default ColumnaDia;
