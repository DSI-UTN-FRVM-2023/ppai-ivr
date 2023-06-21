import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import { Accion } from './Accion';
import { CambioEstadoLlamada } from './CambioEstadoLlamada';
import { Cliente } from './Cliente';
import { Estado, NombresEstado } from './Estado';
import { OpcionLlamada } from './OpcionLlamada';
import { SubOpcionLlamada } from './SubOpcionLlamada';

export class Llamada {
  #descripcionOperador?: string;
  #detalleAccionRequerida?: string; // TODO: Revisar el tipo
  #duracion?: number;

  #cliente: Cliente;
  #opcionSeleccionada?: OpcionLlamada;
  #subOpcionSeleccionada?: SubOpcionLlamada;
  #cambioEstado: CambioEstadoLlamada[];
  #estadoActual: Estado;
  #accionRequerida?: Accion;

  constructor(cliente: Cliente) {
    this.#cliente = cliente;

    const estadoInicial = new Estado(NombresEstado.INICIADA);

    this.#cambioEstado = [new CambioEstadoLlamada(new Date(), estadoInicial)];
    this.#estadoActual = estadoInicial;
  }

  setDescripcionOperador(descripcionOperador: string): void {
    this.#descripcionOperador = descripcionOperador;
  }

  getDescripcionOperador(): string {
    return this.#descripcionOperador;
  }

  setDetalleAccionRequerida(detalleAccionRequerida): void {
    this.#detalleAccionRequerida = detalleAccionRequerida;
  }

  getDetalleAccionRequerida(): string {
    return this.#detalleAccionRequerida;
  }

  setDuracion(duracion: number): void {
    this.#duracion = duracion;
  }

  getDuracion(): number {
    return this.#duracion;
  }

  setOpcionSeleccionada(opcionSeleccionada?: OpcionLlamada): void {
    this.#opcionSeleccionada = opcionSeleccionada;
  }

  getOpcionSeleccionada(): OpcionLlamada | undefined {
    return this.#opcionSeleccionada;
  }

  setSubOpcionSeleccionada(subOpcionSeleccionada?: SubOpcionLlamada): void {
    this.#subOpcionSeleccionada = subOpcionSeleccionada;
  }

  getSubOpcionSeleccionada(): SubOpcionLlamada | undefined {
    return this.#subOpcionSeleccionada;
  }

  setCliente(cliente: Cliente): void {
    this.#cliente = cliente;
  }

  getCliente(): Cliente {
    return this.#cliente;
  }

  setCambioEstado(cambioEstado: CambioEstadoLlamada[]): void {
    this.#cambioEstado = cambioEstado;
  }

  getCambioEstado(): CambioEstadoLlamada[] {
    return this.#cambioEstado;
  }

  setEstadoActual(estadoActual: Estado): void {
    this.#estadoActual = estadoActual;
  }

  getEstadoActual(): Estado {
    return this.#estadoActual;
  }

  setAccionRequerida(accionRequerida?: Accion): void {
    this.#accionRequerida = accionRequerida;
  }

  getAccionRequerida(): Accion | undefined {
    return this.#accionRequerida;
  }

  /**
   * Cambia el estado de una llamada Iniciada a En Curso al ser tomada por un operador.
   *
   * @param {Estado} estadoEnCurso La instancia del estado "En Curso".
   */
  tomadaPorOperador(estadoEnCurso: Estado): void {
    this.#estadoActual = estadoEnCurso;

    // Crear nuevo cambio de estado.
    const cambioEstado = new CambioEstadoLlamada(new Date(), estadoEnCurso);

    // Agregar cambio de estado
    this.#cambioEstado.push(cambioEstado);
  }

  /**
   * Retorna el nombre del cliente de la llamada.
   *
   * @returns {string} Nombre del cliente.
   */
  getNombreCliente(): string {
    return this.#cliente.getNombreCompleto();
  }

  /**
   * Busca entre la información registrada del cliente para comparar contra el ingreso de datos del operador
   *
   * @param {ValidacionOpcionOperador[]} listaDatos Lista de datos del operador.
   */
  verificarInformacionCorrectaCliente(
    listaDatos: ValidacionOpcionOperador[],
  ): ValidacionOpcionOperador[] {
    return this.#cliente.esInformacionCorrecta(listaDatos);
  }

  finalizarLlamada(): void {
    return;
  }

  calcularDuracion(): number {
    return 0;
  }

  /**
   * Busca las validaciones de la opcion seleccionada de la llamada.
   */
  getValidacionesOpcionSeleccionada(): string[] {
    return this.#opcionSeleccionada?.getValidaciones();
  }

  /**
   * Busca las validaciones de la subopcion seleccionada de la llamada.
   */
  getValidacionesSubOpcionSeleccionada(): string[] {
    return this.#subOpcionSeleccionada?.getValidaciones();
  }
}
