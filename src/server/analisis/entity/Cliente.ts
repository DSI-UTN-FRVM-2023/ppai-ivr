import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import {
  IColeccion,
  IIterador,
  IteradorInformacionCliente,
} from '../pattern/IteratorPattern';
import { InformacionCliente } from './InformacionCliente';

export class Cliente implements IColeccion<InformacionCliente> {
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

  crearIterador(
    elementos: InformacionCliente[],
  ): IIterador<InformacionCliente> {
    const nuevo = new IteradorInformacionCliente(elementos);

    return nuevo;
  }

  /**
   * Valida las respuestas del cliente que el operador registró contra lo registrado por el cliente.
   *
   * @param {ValidacionOpcionOperador[]} listaDatos
   */
  esInformacionCorrecta(
    listaDatos: ValidacionOpcionOperador[],
  ): ValidacionOpcionOperador[] {
    const nuevo = this.crearIterador(this.#info);

    nuevo.primero();

    for (const datos of listaDatos) {
      while (!nuevo.haTerminado()) {
        nuevo.actual();

        if (
          nuevo.cumpleFiltros([datos.nombreValidacion, datos.datoValidacion])
        ) {
          datos['correcta'] = true;
          continue;
        }

        nuevo.siguiente();
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
