import { Validacion } from './Validacion';

export class SubOpcionLlamada {
  #nombre: string;

  #validacionRequerida?: Validacion[];

  constructor(nombre: string) {
    this.#nombre = nombre;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  setValidacionRequerida(validacionRequerida: Validacion[]): void {
    this.#validacionRequerida = validacionRequerida;
  }

  getValidacionRequerida(): Validacion[] | undefined {
    return this.#validacionRequerida;
  }
}
