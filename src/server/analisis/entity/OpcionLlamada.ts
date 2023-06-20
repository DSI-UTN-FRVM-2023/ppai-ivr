import { SubOpcionLlamada } from './SubOpcionLlamada';

export enum NombresOpcionLlamada {
  ROBO_TARJETA_NUEVA = 'Informar robo y solicitar tarjeta nueva',
  ROBO_TARJETA_ANULAR = 'Informar robo y anular tarjeta',
}

export class OpcionLlamada {
  #nombre: string;
  #nroOrden: number;

  #subOpcionLlamada: SubOpcionLlamada[];

  constructor(
    nombre: string,
    nroOrden: number,
    subOpcionLlamada: SubOpcionLlamada[],
  ) {
    this.#nombre = nombre;
    this.#nroOrden = nroOrden;
    this.#subOpcionLlamada = subOpcionLlamada;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  setNroOrden(nroOrden: number): void {
    this.#nroOrden = nroOrden;
  }

  getNroOrden(): number {
    return this.#nroOrden;
  }

  setSubOpcionLlamada(subOpcionLlamada: SubOpcionLlamada[]): void {
    this.#subOpcionLlamada = subOpcionLlamada;
  }

  getSubOpcionLlamada(): SubOpcionLlamada[] {
    return this.#subOpcionLlamada;
  }
}
