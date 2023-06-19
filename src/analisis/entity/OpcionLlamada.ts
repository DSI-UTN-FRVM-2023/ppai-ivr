import { SubOpcionLlamada } from './SubOpcionLlamada';

export class OpcionLlamada {
  #nombre: string;

  #subOpcionLlamada: SubOpcionLlamada[];

  constructor(nombre: string, subOpcionLlamada: SubOpcionLlamada[]) {
    this.#nombre = nombre;
    this.#subOpcionLlamada = subOpcionLlamada;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  setSubOpcionLlamada(subOpcionLlamada: SubOpcionLlamada[]): void {
    this.#subOpcionLlamada = subOpcionLlamada;
  }

  getSubOpcionLlamada(): SubOpcionLlamada[] {
    return this.#subOpcionLlamada;
  }
}
