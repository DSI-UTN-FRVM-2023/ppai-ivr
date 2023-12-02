import { ValidacionOpcionOperador } from '../../types/validacion.opcion';
import {
  IColeccion,
  IIterador,
  IteradorInformacionCliente,
} from '../pattern/IteratorPattern';
import { InformacionCliente } from './InformacionCliente';

export class Cliente implements IColeccion<InformacionCliente> {
  private dni: string;
  private nombreCompleto: string;
  private nroCelular: string;

  private info: InformacionCliente[];

  constructor(
    dni: string,
    nombreCompleto: string,
    nroCelular: string,
    info?: InformacionCliente[],
  ) {
    this.dni = dni;
    this.nombreCompleto = nombreCompleto;
    this.nroCelular = nroCelular;
    this.info = info || [];
  }

  setDni(dni: string): void {
    this.dni = dni;
  }

  getDni(): string {
    return this.dni;
  }

  setNombreCompleto(nombreCompleto: string): void {
    this.nombreCompleto = nombreCompleto;
  }

  getNombreCompleto(): string {
    return this.nombreCompleto;
  }

  setNroCelular(nroCelular: string): void {
    this.nroCelular = nroCelular;
  }

  getNroCelular(): string {
    return this.nroCelular;
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
    for (const datos of listaDatos) {
      const nuevo = this.crearIterador(this.info);

      nuevo.primero();

      while (!nuevo.haTerminado()) {
        nuevo.actual();

        const esCorrecta = nuevo.cumpleFiltros([
          datos.nombreValidacion,
          datos.datoValidacion,
        ]);

        datos['correcta'] = esCorrecta;

        if (esCorrecta) break;

        nuevo.siguiente();
      }
    }

    return listaDatos;
  }

  getInformacion(): InformacionCliente[] {
    return this.info;
  }

  setInformacion(info: InformacionCliente[]): void {
    this.info = info;
  }
}
