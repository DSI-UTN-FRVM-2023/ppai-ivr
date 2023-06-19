export class OpcionValidacion {
  #descripcion: string;
  #correcta: boolean;

  constructor(descripcion: string, correcta: boolean) {
    this.#descripcion = descripcion;
    this.#correcta = correcta;
  }

  setDescripcion(descripcion: string): void {
    this.#descripcion = descripcion;
  }

  getDescripcion(): string {
    return this.#descripcion;
  }

  setCorrecta(correcta: boolean): void {
    this.#correcta = correcta;
  }

  getCorrecta(): boolean {
    return this.#correcta;
  }
}
