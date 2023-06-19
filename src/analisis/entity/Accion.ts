export class Accion {
  #descripcion: string;

  getDescripcion(): string {
    return this.#descripcion;
  }

  setDescripcion(descripcion: string): void {
    this.#descripcion = descripcion;
  }
}
