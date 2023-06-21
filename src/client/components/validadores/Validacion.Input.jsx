import { useState } from 'react';

const ValidacionInput = ({ infoValidacion, tomarIngresoDatoValidacion }) => {
  const [esCorrecto, setEsCorrecto] = useState(false);

  return (
    <div className="flex w-full">
      <label className={`${esCorrecto ? 'text-green-300' : 'text-red-300'} my-auto w-[35%]`}>
        {infoValidacion.nombreValidacion}
      </label>
      {/** Radio buttons con cada opcion de validacion */}
      <div className="flex flex-row w-full">
        {infoValidacion.opciones.map((opcion) => {
          return (
            <div className="flex flex-row w-full gap-2" key={opcion}>
              <input
                type="radio"
                name={infoValidacion.nombreValidacion}
                value={opcion}
                className="my-auto"
                onClick={(e) => tomarIngresoDatoValidacion(e.target.value, infoValidacion.nombreValidacion, setEsCorrecto)}
              />
              <label className="text-slate-300 my-auto font-bold">{opcion}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ValidacionInput;
