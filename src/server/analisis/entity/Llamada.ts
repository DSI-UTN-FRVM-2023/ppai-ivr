import { ListaValidacion } from '../../types/lista.validacion';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import { Iniciado } from '../pattern/StatePattern';
import { Accion } from './Accion';
import { CambioEstadoLlamada } from './CambioEstadoLlamada';
import { Cliente } from './Cliente';
import { Estado, NombresEstado } from './Estado';
import { OpcionLlamada } from './OpcionLlamada';
import { SubOpcionLlamada } from './SubOpcionLlamada';

export class Llamada {
  private descripcionOperador?: string;
  private detalleAccionRequerida?: string;
  private duracion?: number;

  private cliente: Cliente;
  private opcionSeleccionada?: OpcionLlamada;
  private subOpcionSeleccionada?: SubOpcionLlamada;
  private cambioEstado: CambioEstadoLlamada[];
  private estadoActual: Estado;
  private accionRequerida?: Accion;

  constructor(
    cliente: Cliente,
    estado: Estado,
    cambioEstado: CambioEstadoLlamada[],
  );
  constructor(cliente: Cliente);
  constructor(
    cliente: Cliente,
    estado?: Estado,
    cambioEstado?: CambioEstadoLlamada[],
  ) {
    this.cliente = cliente;

    const estadoInicial = new Iniciado();

    this.cambioEstado = cambioEstado ?? [
      new CambioEstadoLlamada(new Date(), estadoInicial),
    ];
    this.estadoActual = estado ?? estadoInicial;
  }

  setDescripcionOperador(descripcionOperador: string): void {
    this.descripcionOperador = descripcionOperador;
  }

  getDescripcionOperador(): string {
    return this.descripcionOperador;
  }

  setDetalleAccionRequerida(detalleAccionRequerida): void {
    this.detalleAccionRequerida = detalleAccionRequerida;
  }

  getDetalleAccionRequerida(): string {
    return this.detalleAccionRequerida;
  }

  setDuracion(duracion: number): void {
    this.duracion = duracion;
  }

  getDuracion(): number {
    return this.duracion;
  }

  setOpcionSeleccionada(opcionSeleccionada?: OpcionLlamada): void {
    this.opcionSeleccionada = opcionSeleccionada;
  }

  getOpcionSeleccionada(): OpcionLlamada | undefined {
    return this.opcionSeleccionada;
  }

  setSubOpcionSeleccionada(subOpcionSeleccionada?: SubOpcionLlamada): void {
    this.subOpcionSeleccionada = subOpcionSeleccionada;
  }

  getSubOpcionSeleccionada(): SubOpcionLlamada | undefined {
    return this.subOpcionSeleccionada;
  }

  setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  setCambioEstado(cambioEstado: CambioEstadoLlamada[]): void {
    this.cambioEstado = cambioEstado;
  }

  getCambioEstado(): CambioEstadoLlamada[] {
    return this.cambioEstado;
  }

  setEstadoActual(estadoActual: Estado): void {
    this.estadoActual = estadoActual;
  }

  getEstadoActual(): Estado {
    return this.estadoActual;
  }

  setAccionRequerida(accionRequerida?: Accion): void {
    this.accionRequerida = accionRequerida;
  }

  getAccionRequerida(): Accion | undefined {
    return this.accionRequerida;
  }

  /**
   * Cambia el estado de una llamada Iniciada a En Curso al ser tomada por un operador.
   *
   * @param {Date} fechaHoraActual Fecha y hora actual.
   */
  tomadaPorOperador(fechaHoraActual: Date): void {
    /* // Crear nuevo cambio de estado.
    const cambioEstado = new CambioEstadoLlamada(
      fechaYHoraActual,
      estadoEnCurso,
    );

    // Agregar cambio de estado
    this.cambioEstado.push(cambioEstado); */

    this.estadoActual.tomadaPorOperador(this, fechaHoraActual);
  }

  /**
   * Retorna el nombre del cliente de la llamada.
   *
   * @returns {string} Nombre del cliente.
   */
  getNombreCliente(): string {
    return this.cliente.getNombreCompleto();
  }

  /**
   * Busca entre la información registrada del cliente para comparar contra el ingreso de datos del operador
   *
   * @param {ValidacionOpcionOperador[]} listaDatos Lista de datos del operador.
   */
  verificarInformacionCorrectaCliente(
    listaDatos: ValidacionOpcionOperador[],
  ): ValidacionOpcionOperador[] {
    return this.cliente.esInformacionCorrecta(listaDatos);
  }

  /**
   * Finaliza la llamada si está "En Curso", calculando su duración en base a los cambios de estado.
   */
  finalizarLlamada(fechaYHoraActual: Date): void {
    /* this.estadoActual = estadoFinalizada;

    // Crear nuevo cambio de estado.
    const cambioEstado = new CambioEstadoLlamada(
      fechaYHoraActual,
      estadoFinalizada,
    );

    // Agregar cambio de estado
    this.cambioEstado.push(cambioEstado);

    // Calcular duracion.
    this.calcularDuracion(); */

    this.estadoActual.finalizarLlamada(this, fechaYHoraActual);

    this.calcularDuracion();
  }

  /**
   * Calcula la duración (en segundos) de la llamada.
   *
   * @returns {number} Duración de la llamada en segundos.
   */
  calcularDuracion(): number {
    // Buscar cambios de estado entre "En Curso" y "Finalizada".
    const cambiosEstado = this.cambioEstado.filter(
      (cambioEstado) =>
        cambioEstado.getEstado().getNombre() === NombresEstado.EN_CURSO ||
        cambioEstado.getEstado().getNombre() === NombresEstado.FINALIZADO,
    );

    // Si no hay cambios de estado, la duracion es 0.
    if (cambiosEstado.length === 0) return 0;

    // Si hay un cambio de estado, la duracion es la diferencia entre la fecha de inicio y la fecha actual.
    this.duracion =
      (cambiosEstado[1].getFechaHoraInicio().getTime() -
        cambiosEstado[0].getFechaHoraInicio().getTime()) /
      1000;
  }

  /**
   * Busca las validaciones de la opcion seleccionada de la llamada.
   */
  getValidacionesOpcionSeleccionada(): ListaValidacion[] {
    return this.opcionSeleccionada?.getValidaciones();
  }

  /**
   * Busca las validaciones de la subopcion seleccionada de la llamada.
   */
  getValidacionesSubOpcionSeleccionada(): ListaValidacion[] {
    return this.subOpcionSeleccionada?.getValidaciones();
  }

  /**
   * Agrega un nuevo cambio de estado a la llamada.
   *
   * @param {CambioEstadoLlamada} cambioEstado Cambio de estado a agregar.
   *
   * @returns
   */
  agregarCambioEstado(cambioEstado: CambioEstadoLlamada): void {
    this.cambioEstado.push(cambioEstado);
  }
}
