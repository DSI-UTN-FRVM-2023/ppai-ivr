import { DominioService } from '../../dominio.service';
import { Accion } from '../entity/Accion';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Estado } from '../entity/Estado';
import { IGestorRtaOperador } from './interfaces/IGestorRtaOperador';
import { Inject } from '@nestjs/common';
import { Llamada } from '../entity/Llamada';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';

export class GestorRtaOperador implements IGestorRtaOperador {
  #llamadaEnCurso: Llamada;
  #estadoEnCurso: Estado;
  #nombreCliente: string;

  /** Validaciones a realizar sobre la llamada del cliente (opcion seleccionada) */
  #listaValidacionesOpcion: string[];

  /** Validaciones a realizar sobre la llamada del cliente (subopcion seleccionada) */
  #listaValidacionesSubOpcion: string[];

  #categoriaLlamada: CategoriaLlamada;

  /** Nombre de la categoria de la llamada */
  #nombreCategoriaLlamada: string;

  /** Nombre de la opcion seleccionada. */
  #opcionSeleccionada: string;

  /** Nombre de la subopcion seleccionada. */
  #subOpcionSeleccionada: string;

  /** Listado con todas las opciones de validacion que el operador ingresa */
  #listaIngresoDatosParaValidar: ValidacionOpcionOperador[] = [];

  #respuestaOperador: string;
  #accionesRequeridas: Accion[];
  #seleccionAccionARealizar: Accion;
  #fechaHoraActual: Date;
  #estadoFinalizado: Estado;

  constructor(
    @Inject(DominioService)
    private readonly dominio: DominioService,
  ) {
    this.#llamadaEnCurso = this.dominio.llamadaEnCurso;
    this.#categoriaLlamada = this.dominio.categoriaLlamadaEnCurso;
  }

  /**
   * Comienza el proceso de una nueva respuesta de operador ante una llamada de un cliente Iniciada que requiere atención del operador.
   */
  nuevaRespuestaOperador(): any {
    this.recibirLlamada();

    this.buscarDatosLlamada();

    this.buscarValidaciones();

    // Por cuestiones de implementación en web, le pasamos toda la información desde este método.
    // Este método actua entonces como el mostrarDatosLlamadaYValidacionesRequeridas()
    return {
      nombreCliente: this.#nombreCliente,
      nombreCategoriaLlamada: this.#nombreCategoriaLlamada,
      opcionSeleccionada: this.#opcionSeleccionada,
      subOpcionSeleccionada: this.#subOpcionSeleccionada,
      listaValidacionesOpcion: this.#listaValidacionesOpcion,
      listaValidacionesSubOpcion: this.#listaValidacionesSubOpcion,
    };
  }

  recibirLlamada(): void {
    this.#estadoEnCurso = this.buscarEstadoEnCurso();
  }

  buscarEstadoEnCurso(): Estado {
    for (const estado of this.dominio.estados) {
      if (estado.esEnCurso()) return estado;
    }
  }

  /**
   * Busca el nombre del cliente actual de la llamada en curso.
   */
  buscarDatosLlamada(): void {
    // Buscar datos del cliente.
    this.#nombreCliente = this.#llamadaEnCurso.getNombreCliente();

    // Buscar datos de la categoria
    this.#opcionSeleccionada = this.#llamadaEnCurso
      .getOpcionSeleccionada()
      .getNombre();

    this.#subOpcionSeleccionada = this.#llamadaEnCurso
      .getSubOpcionSeleccionada()
      .getNombre();

    this.#nombreCategoriaLlamada = this.#categoriaLlamada.getNombre();
  }

  /**
   * Toma el ingreso de un dato de validación por parte del operador y comienza a validarlo con los del cliente.
   *
   * @param {ValidacionOpcionOperador} datoValidacion Dato a ingresar.
   */
  tomarIngresoDatoValidacion(
    datoValidacion: ValidacionOpcionOperador,
  ): ValidacionOpcionOperador[] {
    // Buscar si este dato ya fue ingresado.
    const dato = this.#listaIngresoDatosParaValidar?.find(
      (dato) => dato.validacion === datoValidacion.validacion,
    );

    // Modificarlo, y si no agregarlo.
    if (dato) dato.dato = datoValidacion.dato;
    else this.#listaIngresoDatosParaValidar.push(datoValidacion);

    // Validar el dato con la información del cliente.
    return this.validarInformacionCliente();
  }

  /**
   * Busca las validaciones requeridas para la opcion y subopcion seleccionada por el cliente.
   */
  buscarValidaciones(): void {
    this.#listaValidacionesOpcion =
      this.#llamadaEnCurso.getValidacionesOpcionSeleccionada();

    this.#listaValidacionesSubOpcion =
      this.#llamadaEnCurso.getValidacionesSubOpcionSeleccionada();
  }

  /**
   * Valida la información del cliente con los datos ingresados por el operador.
   */
  validarInformacionCliente(): ValidacionOpcionOperador[] {
    this.#listaIngresoDatosParaValidar =
      this.#llamadaEnCurso.verificarInformacionCorrectaCliente(
        this.#listaIngresoDatosParaValidar,
      );

    return this.#listaIngresoDatosParaValidar;
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
