export class Estado {
  #nombre: string;

  constructor(nombre: string) {
    this.#nombre = nombre;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  esEnCurso(): boolean {
    return false;
  }

  esFinalizado(): boolean {
    return false;
  }
}
