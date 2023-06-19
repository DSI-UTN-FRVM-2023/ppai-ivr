import { OpcionValidacion } from './OpcionValidacion';
import { Validacion } from './Validacion';

export class InformacionCliente {
  #datoAValidar: string;

  #opcionCorrecta?: OpcionValidacion;
  #validacion: Validacion;

  constructor(datoAValidar: string, validacion: Validacion) {
    this.#datoAValidar = datoAValidar;
    this.#validacion = validacion;
  }

  setDatoAValidar(datoAValidar: string): void {
    this.#datoAValidar = datoAValidar;
  }

  getDatoAValidar(): string {
    return this.#datoAValidar;
  }

  setOpcionCorrecta(opcionCorrecta: OpcionValidacion): void {
    this.#opcionCorrecta = opcionCorrecta;
  }

  getOpcionCorrecta(): OpcionValidacion | undefined {
    return this.#opcionCorrecta;
  }

  getValidacion(): Validacion {
    return this.#validacion;
  }

  setValidacion(validacion: Validacion): void {
    this.#validacion = validacion;
  }

  esValidacion(): boolean {
    return false;
  }

  esInformacionCorrecta(): boolean {
    return false;
  }
}
