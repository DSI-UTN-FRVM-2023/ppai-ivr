import { OpcionValidacion } from './OpcionValidacion';

export class Validacion {
  #mensajeValidacion: string;

  #opcionesValidacion: OpcionValidacion[];

  constructor(
    mensajeValidacion: string,
    opcionesValidacion: OpcionValidacion[],
  ) {
    this.#mensajeValidacion = mensajeValidacion;
    this.#opcionesValidacion = opcionesValidacion;
  }

  setMensajeValidacion(mensajeValidacion: string): void {
    this.#mensajeValidacion = mensajeValidacion;
  }

  getMensajeValidacion(): string {
    return this.#mensajeValidacion;
  }

  setOpcionesValidacion(opcionesValidacion: OpcionValidacion[]): void {
    this.#opcionesValidacion = opcionesValidacion;
  }

  getOpcionesValidacion(): OpcionValidacion[] {
    return this.#opcionesValidacion;
  }
}
