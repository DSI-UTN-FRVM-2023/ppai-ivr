import { Accion } from 'src/analisis/entity/Accion';
import { CategoriaLlamada } from 'src/analisis/entity/CategoriaLlamada';
import { Estado } from 'src/analisis/entity/Estado';
import { InformacionCliente } from 'src/analisis/entity/InformacionCliente';
import { OpcionLlamada } from 'src/analisis/entity/OpcionLlamada';
import { SubOpcionLlamada } from 'src/analisis/entity/SubOpcionLlamada';
import { Validacion } from 'src/analisis/entity/Validacion';

export interface IGestorRtaOperador {
  estadoEnCurso: Estado;
  nombreCliente: string;
  listaValidaciones: Validacion[];
  categoriaLlamada: CategoriaLlamada;
  opcionSeleccionada: OpcionLlamada;
  subOpcionSeleccionada: SubOpcionLlamada;
  listaIngresoDatosParaValidar: InformacionCliente[];
  respuestaOperador: string;
  accionesRequeridas: Accion[];
  seleccionAccionARealizar: Accion;
  fechaHoraActual: Date;
  estadoFinalizado: Estado;

  nuevaRespuestaOperador(): void;

  recibirLlamada(): void;

  buscarEstadoEnCurso(): void;

  buscarDatosLlamada(): void;

  tomarIngresoDatoValidacion(): void;

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
