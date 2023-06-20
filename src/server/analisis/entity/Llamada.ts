import { Accion } from './Accion';
import { CambioEstadoLlamada } from './CambioEstadoLlamada';
import { Cliente } from './Cliente';
import { Estado } from './Estado';
import { OpcionLlamada } from './OpcionLlamada';
import { SubOpcionLlamada } from './SubOpcionLlamada';

export class Llamada {
  #descripcionOperador: string;
  #detalleAccionRequerida;
  #duracion: number;

  #opcionSeleccionada?: OpcionLlamada;
  #subOpcionSeleccionada?: SubOpcionLlamada;
  #cliente: Cliente;
  #cambioEstado: CambioEstadoLlamada[];
  #estadoActual: Estado;
  #accionRequerida?: Accion;

  constructor(
    descripcionOperador: string,
    detalleAccionRequerida,
    duracion: number,
    cliente: Cliente,
    opcionSeleccionada?: OpcionLlamada,
    subOpcionSeleccionada?: SubOpcionLlamada,
  ) {
    this.#descripcionOperador = descripcionOperador;
    this.#detalleAccionRequerida = detalleAccionRequerida;
    this.#duracion = duracion;
    this.#cliente = cliente;
    this.#opcionSeleccionada = opcionSeleccionada;
    this.#subOpcionSeleccionada = subOpcionSeleccionada;
    this.#cambioEstado = [];
    this.#estadoActual = null; // TODO: Definir estado inicial
    this.#accionRequerida = null;
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

  verificarLlamadaTomadaPorOperador(): boolean {
    return false;
  }

  getNombreCliente(): string {
    return '';
  }

  verificarInformacionCorrectaCliente(): boolean {
    return false;
  }

  finalizarLlamada(): void {
    return;
  }

  calcularDuracion(): number {
    return 0;
  }
}
