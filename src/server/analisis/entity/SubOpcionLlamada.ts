import { Validacion } from './Validacion';

export enum NombresSubOpcionLlamada {
  CUENTO_DATOS = 'Cuenta con datos tarjeta',
  NO_CUENTO_DATOS = 'No cuenta con datos tarjeta',
  COMUNICAR_RESPONSABLE = 'Comunicar con responsable de at. al cliente',
}

export class SubOpcionLlamada {
  #nombre: string;
  #nroOrden: number;

  #validacionRequerida?: Validacion[];

  constructor(nombre: string, nroOrden: number) {
    this.#nombre = nombre;
    this.#nroOrden = nroOrden;
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

  setValidacionRequerida(validacionRequerida: Validacion[]): void {
    this.#validacionRequerida = validacionRequerida;
  }

  getValidacionRequerida(): Validacion[] | undefined {
    return this.#validacionRequerida;
  }
}
