import { ValidacionOpcionOperador } from '../../../types/validacion.opcion';

export interface IGestorRtaOperador {
  nuevaRespuestaOperador(): void;

  recibirLlamada(): void;

  buscarEstadoEnCurso(): void;

  buscarDatosLlamada(): void;

  tomarIngresoDatoValidacion(datoValidacion: ValidacionOpcionOperador): void;

  buscarValidaciones(): void;

  validarInformacionCliente(): void;

  tomarIngresoRespuesta(): void;

  buscarAccionesRequeridas(): void;

  tomarSeleccionAccion(): void;

  tomarConfirmacionOperacion(): void;

  finalizarLlamada(): void;

  getFechaYHoraActual(): Date;

  buscarEstadoFinalizado(): void;

  finCU(): void;
}
