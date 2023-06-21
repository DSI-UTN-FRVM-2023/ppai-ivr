import { ValidacionOpcionOperador } from '../../../types/validacion.opcion';

export interface IGestorRtaOperador {
  nuevaRespuestaOperador(): void;

  recibirLlamada(): void;

  buscarEstadoEnCurso(): void;

  buscarDatosLlamada(): void;

  tomarIngresoDatoValidacion(datoValidacion: ValidacionOpcionOperador): void;

  buscarValidaciones(): void;

  validarInformacionCliente(): void;

  tomarIngresoRespuesta(respuestaOperador: string): void;

  buscarAccionesRequeridas(): void;

  tomarSeleccionAccion(accionSeleccionada: string): void;

  tomarConfirmacionOperacion(): void;

  finalizarLlamada(): void;

  getFechaYHoraActual(): Date;

  buscarEstadoFinalizado(): void;

  finCU(): void;
}
