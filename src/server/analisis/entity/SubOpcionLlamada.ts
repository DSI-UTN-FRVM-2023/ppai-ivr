import { ListaValidacion } from '../../types/lista.validacion';
import {
  IColeccion,
  IIterador,
  IteradorValidacion,
} from '../pattern/IteratorPattern';
import { Validacion } from './Validacion';

export enum NombresSubOpcionLlamada {
  CUENTO_DATOS = 'Cuenta con datos tarjeta',
  NO_CUENTO_DATOS = 'No cuenta con datos tarjeta',
  COMUNICAR_RESPONSABLE = 'Comunicar con responsable de at. al cliente',
}

export class SubOpcionLlamada implements IColeccion<Validacion> {
  private nombre: string;
  private nroOrden: number;

  private validacionRequerida?: Validacion[];

  constructor(
    nombre: string,
    nroOrden: number,
    validacionesRequeridas?: Validacion[],
  ) {
    this.nombre = nombre;
    this.nroOrden = nroOrden;
    this.validacionRequerida = validacionesRequeridas;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNroOrden(nroOrden: number): void {
    this.nroOrden = nroOrden;
  }

  getNroOrden(): number {
    return this.nroOrden;
  }

  setValidacionRequerida(validacionRequerida: Validacion[]): void {
    this.validacionRequerida = validacionRequerida;
  }

  getValidacionRequerida(): Validacion[] | undefined {
    return this.validacionRequerida;
  }

  crearIterador(elementos: Validacion[]): IIterador<Validacion> {
    const nuevo = new IteradorValidacion(elementos);

    return nuevo;
  }

  /**
   * Devuelve los mensajes de las validaciones pertenecientes a esta opcion.
   */
  getValidaciones(): ListaValidacion[] {
    const listaValidacion: ListaValidacion[] = [];

    if (this.validacionRequerida) {
      const nuevo2 = this.crearIterador(this.validacionRequerida);

      nuevo2.primero();

      while (!nuevo2.haTerminado()) {
        const actual = nuevo2.actual();

        const opciones = actual.getOpcionesValidacion();

        listaValidacion.push({
          nombreValidacion: actual.getMensajeValidacion(),
          opciones,
        });

        nuevo2.siguiente();
      }
    }

    return listaValidacion;
  }
}
