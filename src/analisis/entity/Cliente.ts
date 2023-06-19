export class Cliente {
  #dni: string;
  #nombreCompleto: string;
  #nroCelular: string;

  constructor(dni: string, nombreCompleto: string, nroCelular: string) {
    this.#dni = dni;
    this.#nombreCompleto = nombreCompleto;
    this.#nroCelular = nroCelular;
  }

  setDni(dni: string): void {
    this.#dni = dni;
  }

  getDni(): string {
    return this.#dni;
  }

  setNombreCompleto(nombreCompleto: string): void {
    this.#nombreCompleto = nombreCompleto;
  }

  getNombreCompleto(): string {
    return this.#nombreCompleto;
  }

  setNroCelular(nroCelular: string): void {
    this.#nroCelular = nroCelular;
  }

  getNroCelular(): string {
    return this.#nroCelular;
  }

  esInformacionCorrecta(): boolean {
    return false;
  }
}
