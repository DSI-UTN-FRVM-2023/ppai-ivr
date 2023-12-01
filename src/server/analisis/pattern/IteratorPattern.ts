import { Accion } from '../entity/Accion';
import { InformacionCliente } from '../entity/InformacionCliente';
import { OpcionValidacion } from '../entity/OpcionValidacion';
import { Validacion } from '../entity/Validacion';

export interface IIterador<T> {
  /**
   * Devuelve el elemento actual de la iteracion.
   *
   * @returns {T} El elemento actual de la iteracion.
   */
  actual(): T;

  /**
   * Establece al iterador en el primer elemento.
   */
  primero(): void;

  /**
   * Avanza una posicion en el iterador de elementos.
   */
  siguiente(): void;

  /**
   * Verifica si ha terminado de iterar toda la lista de elementos.
   *
   * @returns {boolean} Verdadero si ha terminado de iterar toda la lista de elementos, falso en caso contrario.
   */
  haTerminado(): boolean;

  /**
   * Valida ciertos filtros para el elemento actual.
   *
   * @param {any[]} filtros Los filtros a validar.
   *
   * @returns {boolean} Verdadero si el elemento actual cumple con los filtros, falso en caso contrario.
   */
  cumpleFiltros(filtros: any[]): boolean;
}

export interface IColeccion<T> {
  /**
   * Crea un nuevo iterador para elementos especificos.
   *
   * @param {T} elementos Los elementos que tendra cargados el iterador.
   *
   * @returns {IIterador<T>} Un nuevo iterador para los elementos especificos.
   */
  crearIterador(elementos: T): IIterador<T>;
}

/**
 * Concrecion del Iterador de Validacion.
 *
 * @class
 */
export class IteradorValidacion implements IIterador<Validacion> {
  private elementos: Validacion[];
  private posicion: number;

  actual(): Validacion {
    return this.elementos[this.posicion];
  }
  primero(): void {
    this.posicion = 0;
  }
  siguiente(): void {
    if (this.posicion < this.elementos.length - 1) this.posicion += 1;
  }
  haTerminado(): boolean {
    return this.posicion >= this.elementos.length;
  }
  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}

export class IteradorAccion implements IIterador<Accion> {
  private elementos: Accion[];
  private posicion: number;

  actual(): Accion {
    return this.elementos[this.posicion];
  }
  primero(): void {
    this.posicion = 0;
  }
  siguiente(): void {
    if (this.posicion < this.elementos.length - 1) this.posicion += 1;
  }
  haTerminado(): boolean {
    return this.posicion >= this.elementos.length;
  }
  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}

export class IteradorInformacionCliente
  implements IIterador<InformacionCliente>
{
  private elementos: InformacionCliente[];
  private posicion: number;

  actual(): InformacionCliente {
    return this.elementos[this.posicion];
  }
  primero(): void {
    this.posicion = 0;
  }
  siguiente(): void {
    if (this.posicion < this.elementos.length - 1) this.posicion += 1;
  }
  haTerminado(): boolean {
    return this.posicion >= this.elementos.length;
  }
  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}

export class IteradorOpcionValidacion implements IIterador<OpcionValidacion> {
  private elementos: OpcionValidacion[];
  private posicion: number;

  actual(): OpcionValidacion {
    return this.elementos[this.posicion];
  }
  primero(): void {
    this.posicion = 0;
  }
  siguiente(): void {
    if (this.posicion < this.elementos.length - 1) this.posicion += 1;
  }
  haTerminado(): boolean {
    return this.posicion >= this.elementos.length;
  }
  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}
