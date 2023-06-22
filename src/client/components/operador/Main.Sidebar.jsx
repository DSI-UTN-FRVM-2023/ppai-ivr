import ValidacionInput from '../validadores/Validacion.Input';
import axios from 'axios';
import { useState } from 'react';

const MainSidebar = ({ info }) => {
  const [datosValidacion, setDatosValidacion] = useState([]);

  const [acciones, setAcciones] = useState([]);

  const [confirmacionOperador, setConfirmacionOperador] = useState(false);

  /**
   * Toma el ingreso de un dato de validación por parte del operador.
   * 
   * @param {*} valorValidacion El valor de la opcion seleccionada.
   * @param {*} nombreValidacion El nombre de la validación donde se seleccionó la opción.
   * @param {*} setEsCorrecto Puntero a la función de si es correcta o no.
   */
  async function tomarIngresoDatoValidacion(
    valorValidacion,
    nombreValidacion,
    setEsCorrecto,
  ) {
    const { data } = await axios({
      method: 'POST',
      url: `/boundary/tomarIngresoDatoValidacion`,
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

    solicitarRespuestaOperador();
  }

  /**
   * Solicita al operador ingrese una respuesta.
   */
  async function solicitarRespuestaOperador() {
    await axios({
      method: 'GET',
      url: '/boundary/solicitarRespuestaOperador',
    });
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

  async function tomarSeleccionAccion(accionARealizar) {
    await axios({
      method: 'POST',
      url: '/boundary/tomarSeleccionAccion',
      data: {
        accionSeleccionada: accionARealizar,
      },
    });

    solicitarConfirmacionOperacion();
  }

  async function solicitarConfirmacionOperacion() {
    const { data } = await axios({
      method: 'GET',
      url: '/boundary/solicitarConfirmacionOperacion',
    });

    setConfirmacionOperador(data);
  }

  async function tomarConfirmacionOperacion() {
    try {
      const { data: mensajeConfirmacion } = await axios({
        method: 'POST',
        url: '/boundary/tomarConfirmacionOperacion',
      });

      mostrarMensajeAccionRegistrada(mensajeConfirmacion);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  async function mostrarMensajeAccionRegistrada(mensaje) {
    alert(mensaje);

    // Redireccionar a /fin
    window.location.href = '/fin';
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
              <select
                className="w-full"
                defaultValue="null"
                onChange={(e) => {
                  tomarSeleccionAccion(e.target.value);
                }}
              >
                <option value="null" disabled>
                  Seleccione una
                </option>
                {acciones.map((accion) => (
                  <option key={accion} value={accion}>
                    {accion}
                  </option>
                ))}
              </select>

              {/** Si ya estamos para la confirmación, mostrar el botón de confirmar. */}
              {confirmacionOperador ? (
                <button name="botonConfirmacion" className="w-full my-4 p-2 rounded-xl bg-green-600 text-white font-bold" onClick={(e) => tomarConfirmacionOperacion()}>
                  Confirmar Respuesta
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MainSidebar;
