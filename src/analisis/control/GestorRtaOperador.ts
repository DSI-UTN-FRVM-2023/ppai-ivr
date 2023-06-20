import { DominioService } from 'src/dominio.service';
import { Accion } from '../entity/Accion';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Estado, NombresEstado } from '../entity/Estado';
import { InformacionCliente } from '../entity/InformacionCliente';
import { OpcionLlamada } from '../entity/OpcionLlamada';
import { SubOpcionLlamada } from '../entity/SubOpcionLlamada';
import { Validacion } from '../entity/Validacion';
import { IGestorRtaOperador } from './interfaces/IGestorRtaOperador';
import { Inject } from '@nestjs/common';
import { Llamada } from '../entity/Llamada';

export class GestorRtaOperador implements IGestorRtaOperador {
  #llamadaEnCurso: Llamada;
  #estadoEnCurso: Estado;
  #nombreCliente: string;
  #listaValidaciones: Validacion[];
  #categoriaLlamada: CategoriaLlamada;
  #opcionSeleccionada: OpcionLlamada;
  #subOpcionSeleccionada: SubOpcionLlamada;
  #listaIngresoDatosParaValidar: InformacionCliente[];
  #respuestaOperador: string;
  #accionesRequeridas: Accion[];
  #seleccionAccionARealizar: Accion;
  #fechaHoraActual: Date;
  #estadoFinalizado: Estado;

  constructor(
    @Inject(DominioService)
    private readonly dominio: DominioService,
  ) {
    // Crear llamada en curso por falta de persistencia.
    // this.#llamadaEnCurso = new Llamada();

    this.nuevaRespuestaOperador();
  }

  nuevaRespuestaOperador(): void {
    this.recibirLlamada();
  }

  recibirLlamada(): void {
    this.#estadoEnCurso = this.buscarEstadoEnCurso();
  }

  buscarEstadoEnCurso(): Estado {
    for (const estado of this.dominio.estados) {
      if (estado.esEnCurso()) return estado;
    }
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
