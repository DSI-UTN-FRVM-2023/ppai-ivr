import { DominioService } from '../../dominio.service';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Estado } from '../entity/Estado';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Llamada } from '../entity/Llamada';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import { ListaValidacion } from '../../types/lista.validacion';
import {
  IColeccion,
  IIterador,
  IteradorAccion,
} from '../pattern/IteratorPattern';
import { Accion } from '../entity/Accion';

export class GestorRtaOperador implements IColeccion<Accion> {
  /** Puntero hacia la instancia de la llamada en curso (proveniente del CU1) */
  #llamadaEnCurso: Llamada;

  /** Nombre del cliente de la llamada en curso. */
  #nombreCliente: string;

  /** Validaciones a realizar sobre la llamada del cliente (opcion seleccionada) */
  #listaValidacionesOpcion: ListaValidacion[];

  /** Validaciones a realizar sobre la llamada del cliente (subopcion seleccionada) */
  #listaValidacionesSubOpcion: ListaValidacion[];

  /** La categoria de la llamada según lo que seleccionó el cliente. */
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

  /** La fecha y hora actual del sistema. */
  #fechaHoraActual: Date;

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

  /**
   * Toma la llamada Iniciada de un cliente y la pasa a En Curso.
   */
  recibirLlamada(): void {
    this.#llamadaEnCurso.tomadaPorOperador(this.#fechaHoraActual);
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

  crearIterador(elementos: Accion[]): IIterador<Accion> {
    const nuevo = new IteradorAccion(elementos);

    return nuevo;
  }

  /**
   * Busca todas las acciones posibles de efectuar en el dominio.
   *
   * @returns {string[]} Listado de acciones posibles.
   */
  buscarAccionesRequeridas(): string[] {
    const nuevo = this.crearIterador(this.dominio.acciones);

    nuevo.primero();

    const accionesRequeridas: string[] = [];

    while (!nuevo.haTerminado()) {
      const actual = nuevo.actual();

      accionesRequeridas.push(actual.getDescripcion());

      nuevo.siguiente();
    }

    return accionesRequeridas;
  }

  /**
   * Toma la seleccion de una acción a realizar por parte del operador.
   * @param accionSeleccionada
   */
  tomarSeleccionAccion(accionSeleccionada: string): void {
    this.#seleccionAccionARealizar = accionSeleccionada;
  }

  /**
   * Ejecuta el caso de uso 28 y devuelve un mensaje de éxito o fallo dependiendo de su ejecución.
   */
  tomarConfirmacionOperacion(): string {
    // Simular la ejecución del caso de uso 28 con posible fallo.
    const random = Math.floor(Math.random() * 1000);

    if (random > 500)
      throw new InternalServerErrorException(
        `La acción "${
          this.#seleccionAccionARealizar
        }" no se pudo ejecutar. Intente de nuevo.`,
      );

    const mensajeCu28 = `La acción "${
      this.#seleccionAccionARealizar
    }" se ejecutó exitosamente.`;

    this.finalizarLlamada();

    return mensajeCu28;
  }

  /**
   * Obtiene la fecha y hora actual, cambia la llamada en curso a finalizada y finaliza el caso de uso.
   */
  finalizarLlamada(): void {
    this.#fechaHoraActual = this.getFechaYHoraActual();

    this.#llamadaEnCurso.finalizarLlamada(this.#fechaHoraActual);

    this.finCU();
  }

  /**
   * Obtiene la fecha y hora actual.
   * @returns {Date} Fecha y hora actual.
   */
  getFechaYHoraActual(): Date {
    return new Date();
  }

  /**
   * Finaliza el caso de uso y muestra por consola los datos finales del gestor.
   */
  finCU(): void {
    console.log(`Respuesta del operador registrada.`);
    console.log(`Cliente: ${this.#nombreCliente}`);
    console.log(`Categoría: ${this.#nombreCategoriaLlamada}`);
    console.log(`Opción: ${this.#opcionSeleccionada}`);
    console.log(`Subopción: ${this.#subOpcionSeleccionada}`);
    console.log(`Descripcion del Operador: ${this.#respuestaOperador}`);
    console.log(`Fecha y hora: ${this.#fechaHoraActual}`);
    console.log(
      `Estados de la Llamada: ${this.#llamadaEnCurso
        .getCambioEstado()
        .map((cambioEstado) => cambioEstado.getEstado().getNombre())
        .join(', ')}`,
    );
    console.log(
      `Duración Llamada: ${this.#llamadaEnCurso.getDuracion()} segundos`,
    );
  }
}
