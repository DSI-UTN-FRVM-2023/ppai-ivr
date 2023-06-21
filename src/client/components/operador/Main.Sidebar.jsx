import ValidacionInput from '../validadores/Validacion.Input';
import axios from 'axios';
import { useState } from 'react';

const MainSidebar = ({ info }) => {
  const [datosValidacion, setDatosValidacion] = useState([]);

  const [acciones, setAcciones] = useState([]);

  async function tomarIngresoDatoValidacion(
    valorValidacion,
    nombreValidacion,
    setEsCorrecto,
  ) {
    const { data } = await axios({
      method: 'POST',
      url: `/boundary/${tomarIngresoDatoValidacion.name}`,
      data: {
        datoValidacion: valorValidacion,
        nombreValidacion,
      },
    });

    // Encontrar dato validado en la lista de validaciones de la opcion o subopcion seleccionada y cambiar su estado.
    setEsCorrecto(
      data.find(
        (validacion) => validacion.nombreValidacion === nombreValidacion,
      ).correcta,
    );

    setDatosValidacion(data);
  }

  async function tomarIngresoRespuesta(respuestaOperador) {
    await axios({
      method: 'POST',
      url: '/boundary/tomarIngresoRespuesta',
      data: {
        respuestaOperador,
      },
    });

    mostrarAccionParaSeleccion();
  }

  async function mostrarAccionParaSeleccion() {
    const { data: acciones } = await axios({
      method: 'GET',
      url: '/boundary/mostrarAccionParaSeleccion',
    });

    setAcciones(acciones);
  }

  async function tomarSeleccionAccion(accionSeleccionada) {
    await axios({
      method: 'POST',
      url: '/boundary/tomarSeleccionAccion',
      data: {
        accionSeleccionada,
      },
    });

    //solicitarConfirmacionOperacion();
  }

  return (
    <div className="w-full col-span-2 bg-slate-800 py-6 px-4">
      <h1 className="text-xl font-bold text-slate-200">
        Responder llamada de {info.nombreCliente}
      </h1>
      <p className="text-sm text-slate-200">
        <b>Categoría:</b> {info.nombreCategoriaLlamada}
      </p>

      {/** Validaciones de opcion (si es que existen) */}
      <p className="text-sm text-slate-200">
        <b>Opción Seleccionada:</b> {info.opcionSeleccionada}
      </p>
      {info?.listaValidacionesOpcion?.length ? (
        <div className="p-2 w-full">
          <h2 className="text-md font-bold text-slate-100">
            Validaciones a Realizar por Opción
          </h2>
          {info?.listaValidacionesOpcion?.map((validacion) => {
            return (
              <ValidacionInput
                key={validacion.nombreValidacion}
                infoValidacion={validacion}
                tomarIngresoDatoValidacion={tomarIngresoDatoValidacion}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {/** Validaciones de sub-opcion (si es que existen) */}
      <p className="text-sm text-slate-200">
        <b>Sub-Opción Seleccionada:</b> {info?.subOpcionSeleccionada}
      </p>
      {info?.listaValidacionesSubOpcion?.length ? (
        <div className="p-2 w-full">
          <h2 className="text-md font-bold text-slate-100">
            Validaciones a Realizar por Sub-Opción
          </h2>
          {info?.listaValidacionesSubOpcion?.map((validacion) => {
            return (
              <ValidacionInput
                key={validacion.nombreValidacion}
                infoValidacion={validacion}
                tomarIngresoDatoValidacion={tomarIngresoDatoValidacion}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}

      {/** Si ya se tienen todas las validaciones correctas, habilitar la descripción del operador. */}
      {datosValidacion.filter(({ correcta }) => correcta).length ===
        datosValidacion.length && datosValidacion.length > 0 ? (
        <div className="">
          <h2 className="text-md font-bold text-slate-100">
            Ingrese una descripción
          </h2>
          <textarea
            className="rounded-xl resize-none w-full p-2"
            onBlur={(e) => {
              tomarIngresoRespuesta(e.target.value);
            }}
          ></textarea>

          {/** Si hay una descripción, mostrar las acciones. */}
          {acciones.length ? (
            <>
              <h2 className="text-md font-bold text-slate-100">
                Seleccione una Acción
              </h2>
              <select className="w-full" defaultValue="null" onChange={(e) => {
                tomarSeleccionAccion(e.target.value);
              }}>
                <option value="null" disabled>
                  Seleccione una
                </option>
                {acciones.map((accion) => (
                  <option key={accion} value={accion}>
                    {accion}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MainSidebar;
