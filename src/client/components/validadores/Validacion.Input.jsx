import axios from 'axios';
import { useState } from 'react';

const ValidacionInput = ({ nombreValidacion }) => {
  const [esCorrecto, setEsCorrecto] = useState(false);

  async function tomarIngresoDatoValidacion(valorValidacion) {
    const { data } = await axios({
      method: 'POST',
      url: `/boundary/${tomarIngresoDatoValidacion.name}`,
      data: {
        dato: valorValidacion,
        validacion: nombreValidacion,
      },
    });

    // Encontrar dato validado en la lista de validaciones de la opcion o subopcion seleccionada y cambiar su estado.
    setEsCorrecto(data.find((validacion) => validacion.validacion === nombreValidacion).correcta);
  }

  return (
    <div className="flex w-full">
      <label className="text-slate-300 my-auto">{nombreValidacion}</label>
      <input
        type="text"
        className={`border-4 ${esCorrecto ? 'border-green-300' : 'border-red-300'} p-2 rounded-lg m-2 w-full`}
        onBlur={(e) => {
          tomarIngresoDatoValidacion(e.target.value);
        }}
      />
    </div>
  );
};

export default ValidacionInput;
