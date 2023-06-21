import { ListaValidacion } from '../../types/lista.validacion';
import { SubOpcionLlamada } from './SubOpcionLlamada';
import { Validacion } from './Validacion';

export enum NombresOpcionLlamada {
  ROBO_TARJETA_NUEVA = 'Informar robo y solicitar tarjeta nueva',
  ROBO_TARJETA_ANULAR = 'Informar robo y anular tarjeta',
}

export class OpcionLlamada {
  #nombre: string;
  #nroOrden: number;

  #subOpcionLlamada: SubOpcionLlamada[];
  #validacionesRequeridas?: Validacion[];

  constructor(
    nombre: string,
    nroOrden: number,
    subOpcionLlamada: SubOpcionLlamada[],
    validacionesRequeridas?: Validacion[],
  ) {
    this.#nombre = nombre;
    this.#nroOrden = nroOrden;
    this.#subOpcionLlamada = subOpcionLlamada;
    this.#validacionesRequeridas = validacionesRequeridas;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  setNroOrden(nroOrden: number): void {
    this.#nroOrden = nroOrden;
  }

  getNroOrden(): number {
    return this.#nroOrden;
  }

  setSubOpcionLlamada(subOpcionLlamada: SubOpcionLlamada[]): void {
    this.#subOpcionLlamada = subOpcionLlamada;
  }

  getSubOpcionLlamada(): SubOpcionLlamada[] {
    return this.#subOpcionLlamada;
  }

  setValidaciones(validaciones: Validacion[]): void {
    this.#validacionesRequeridas = validaciones;
  }

  /**
   * Devuelve los mensajes de las validaciones pertenecientes a esta opcion.
   */
  getValidaciones(): ListaValidacion[] {
    const listaValidacion = this.#validacionesRequeridas?.map<ListaValidacion>(
      (validacion) => {
        return {
          nombreValidacion: validacion.getMensajeValidacion(),
          opciones: validacion
            .getOpcionesValidacion()
            .map((opcion) => opcion.getDescripcion()),
        };
      },
    );

    return listaValidacion;
  }
}
