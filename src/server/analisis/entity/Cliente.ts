import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import { InformacionCliente } from './InformacionCliente';

export class Cliente {
  #dni: string;
  #nombreCompleto: string;
  #nroCelular: string;

  #info: InformacionCliente[];

  constructor(
    dni: string,
    nombreCompleto: string,
    nroCelular: string,
    info?: InformacionCliente[],
  ) {
    this.#dni = dni;
    this.#nombreCompleto = nombreCompleto;
    this.#nroCelular = nroCelular;
    this.#info = info || [];
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

  /**
   * Valida las respuestas del cliente que el operador registró contra lo registrado por el cliente.
   *
   * @param {ValidacionOpcionOperador[]} listaDatos
   */
  esInformacionCorrecta(
    listaDatos: ValidacionOpcionOperador[],
  ): ValidacionOpcionOperador[] {
    // Por cada información del cliente registrada, validar los datos.
    for (const validacion of listaDatos) {
      for (const informacion of this.#info) {
        // Es la validación que dice el dato tener?
        if (informacion.esValidacion(validacion.nombreValidacion)) {
          // Verificar el valor del dato de validación
          // TODO: VERIFICAR EL TEMA DEL METODO *esCorrecta() A LA OPCIONVALIDACION
          validacion['correcta'] = informacion.esInformacionCorrecta(
            validacion.datoValidacion,
          );
        }
      }
    }

    return listaDatos;
  }

  getInformacion(): InformacionCliente[] {
    return this.#info;
  }

  setInformacion(info: InformacionCliente[]): void {
    this.#info = info;
  }
}
