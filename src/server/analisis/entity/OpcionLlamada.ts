import { ListaValidacion } from '../../types/lista.validacion';
import {
  IColeccion,
  IIterador,
  IteradorValidacion,
} from '../pattern/IteratorPattern';
import { SubOpcionLlamada } from './SubOpcionLlamada';
import { Validacion } from './Validacion';

export enum NombresOpcionLlamada {
  ROBO_TARJETA_NUEVA = 'Informar robo y solicitar tarjeta nueva',
  ROBO_TARJETA_ANULAR = 'Informar robo y anular tarjeta',
}

export class OpcionLlamada implements IColeccion<Validacion> {
  private nombre: string;
  private nroOrden: number;

  private subOpcionLlamada: SubOpcionLlamada[];
  private validacionesRequeridas?: Validacion[];

  constructor(
    nombre: string,
    nroOrden: number,
    subOpcionLlamada: SubOpcionLlamada[],
    validacionesRequeridas?: Validacion[],
  ) {
    this.nombre = nombre;
    this.nroOrden = nroOrden;
    this.subOpcionLlamada = subOpcionLlamada;
    this.validacionesRequeridas = validacionesRequeridas;
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

  setSubOpcionLlamada(subOpcionLlamada: SubOpcionLlamada[]): void {
    this.subOpcionLlamada = subOpcionLlamada;
  }

  getSubOpcionLlamada(): SubOpcionLlamada[] {
    return this.subOpcionLlamada;
  }

  setValidaciones(validaciones: Validacion[]): void {
    this.validacionesRequeridas = validaciones;
  }

  crearIterador(elementos: Validacion[]): IteradorValidacion {
    // Crear iterador concreto.
    const nuevo = new IteradorValidacion(elementos);

    return nuevo;
  }

  /**
   * Devuelve los mensajes de las validaciones pertenecientes a esta opcion.
   */
  getValidaciones(): ListaValidacion[] {
    /* const listaValidacion = this.validacionesRequeridas?.map<ListaValidacion>(
      (validacion) => {
        return {
          nombreValidacion: validacion.getMensajeValidacion(),
          opciones: validacion
            .getOpcionesValidacion()
            .map((opcion) => opcion.getDescripcion()),
        };
      },
    );

    return listaValidacion; */

    // Crear iterador concreto.
    const a = this.validacionesRequeridas;
    const nuevo = this.crearIterador(this.validacionesRequeridas);

    // Posicionar en primer elemento.
    nuevo.primero();

    const resultado: ListaValidacion[] = [];

    while (!nuevo.haTerminado()) {
      // Obtener actual.
      const actual = nuevo.actual();

      // Obtener mensaje de validacion.
      const mensaje = actual.getMensajeValidacion();

      // Obtener opciones validaciones.
      const opciones = actual.getOpcionesValidacion();

      resultado.push({
        nombreValidacion: mensaje,
        opciones,
      });

      nuevo.siguiente();
    }

    return resultado;
  }
}
