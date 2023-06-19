import { Accion } from '../entity/Accion';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Estado } from '../entity/Estado';
import { InformacionCliente } from '../entity/InformacionCliente';
import { OpcionLlamada } from '../entity/OpcionLlamada';
import { SubOpcionLlamada } from '../entity/SubOpcionLlamada';
import { Validacion } from '../entity/Validacion';
import { IGestorRtaOperador } from './interfaces/IGestorRtaOperador';

export class GestorRtaOperador implements IGestorRtaOperador {
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

  nuevaRespuestaOperador(): void {
    throw new Error('Method not implemented.');
  }
  recibirLlamada(): void {
    throw new Error('Method not implemented.');
  }
  buscarEstadoEnCurso(): void {
    throw new Error('Method not implemented.');
  }
  buscarDatosLlamada(): void {
    throw new Error('Method not implemented.');
  }
  tomarIngresoDatoValidacion(): void {
    throw new Error('Method not implemented.');
  }
  buscarValidaciones(): void {
    throw new Error('Method not implemented.');
  }
  validarInformacionCliente(): void {
    throw new Error('Method not implemented.');
  }
  tomarIngresoRespuesta(): void {
    throw new Error('Method not implemented.');
  }
  buscarAccionesRequeridas(): void {
    throw new Error('Method not implemented.');
  }
  tomarSeleccionAccion(): void {
    throw new Error('Method not implemented.');
  }
  tomarConfirmacionOperacion(): void {
    throw new Error('Method not implemented.');
  }
  finalizarLlamada(): void {
    throw new Error('Method not implemented.');
  }
  getFechaYHoraActual(): Date {
    throw new Error('Method not implemented.');
  }
  buscarEstadoFinalizado(): void {
    throw new Error('Method not implemented.');
  }
  finCU(): void {
    throw new Error('Method not implemented.');
  }
}
