import { OpcionLlamada } from './OpcionLlamada';

export enum NombresCategoria {
  ROBO = 'Robo',
}

export class CategoriaLlamada {
  #nombre: string;

  #opcion: OpcionLlamada[];

  constructor(nombre: string, opciones: OpcionLlamada[]) {
    this.#nombre = nombre;
    this.#opcion = opciones;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  setOpcion(opcion: OpcionLlamada[]): void {
    this.#opcion = opcion;
  }

  getOpcion(): OpcionLlamada[] {
    return this.#opcion;
  }

  getCategoriaOpcionSubOpcion(): void {
    return;
  }

  buscarValidaciones(): void {
    throw new Error('Method not implemented.');
  }
}
