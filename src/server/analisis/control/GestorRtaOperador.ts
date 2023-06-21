import { DominioService } from '../../dominio.service';
import { Accion } from '../entity/Accion';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Estado } from '../entity/Estado';
import { IGestorRtaOperador } from './interfaces/IGestorRtaOperador';
import { Inject } from '@nestjs/common';
import { Llamada } from '../entity/Llamada';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import { ListaValidacion } from '../../types/lista.validacion';

export class GestorRtaOperador implements IGestorRtaOperador {
  /** Puntero hacia la instancia de la llamada en curso (proveniente del CU1) */
  #llamadaEnCurso: Llamada;

  /** Puntero hacia la instancia del estado "En Curso". */
  #estadoEnCurso: Estado;

  /** Nombre del cliente de la llamada en curso. */
  #nombreCliente: string;

  /** Validaciones a realizar sobre la llamada del cliente (opcion seleccionada) */
  #listaValidacionesOpcion: ListaValidacion[];

  /** Validaciones a realizar sobre la llamada del cliente (subopcion seleccionada) */
  #listaValidacionesSubOpcion: ListaValidacion[];

  #categoriaLlamada: CategoriaLlamada;

  /** Nombre de la categoria de la llamada */
  #nombreCategoriaLlamada: string;

  /** Nombre de la opcion seleccionada. */
  #opcionSeleccionada: string;

  /** Nombre de la subopcion seleccionada. */
  #subOpcionSeleccionada: string;

  /** Listado con todas las opciones de validacion que el operador ingresa */
  #listaIngresoDatosParaValidar: ValidacionOpcionOperador[] = [];

  /** La respuesta del operador a la llamada. */
  #respuestaOperador: string;

  /** Listado de todas las acciones disponibles para selección. */
  accionesRequeridas: string[];

  /** La selección del operador ante la acción a realizar. */
  #seleccionAccionARealizar: string;

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
      (dato) => dato.nombreValidacion === datoValidacion.nombreValidacion,
    );

    // Modificarlo, y si no agregarlo.
    if (dato) dato.datoValidacion = datoValidacion.datoValidacion;
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

  /**
   * Toma el ingreso de una respuesta descriptiva del operador ante la llamada y busca las acciones requeridas.
   *
   * @param {string} respuestaOperador La respuesta del operador.
   */
  tomarIngresoRespuesta(respuestaOperador: string): void {
    this.#respuestaOperador = respuestaOperador;

    this.accionesRequeridas = this.buscarAccionesRequeridas();
  }

  /**
   * Busca todas las acciones posibles de efectuar en el dominio.
   *
   * @returns {string[]} Listado de acciones posibles.
   */
  buscarAccionesRequeridas(): string[] {
    return this.dominio.acciones.map((accion) => accion.getDescripcion());
  }

  tomarSeleccionAccion(accionSeleccionada: string): void {
    this.#seleccionAccionARealizar = accionSeleccionada;
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
