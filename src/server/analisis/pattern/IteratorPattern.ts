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
   * @param {Array<T>} elementos Los elementos que tendra cargados el iterador.
   *
   * @returns {IIterador<T>} Un nuevo iterador para los elementos especificos.
   */
  crearIterador(elementos: Array<T>): IIterador<T>;
}

/**
 * Concrecion del Iterador de Validacion.
 *
 * @class
 */
export class IteradorValidacion implements IIterador<Validacion> {
  private elementos: Validacion[];
  private posicion: number;

  constructor(elementos: Validacion[]) {
    this.elementos = elementos;
    this.posicion = 0;
  }

  actual(): Validacion {
    return this.elementos[this.posicion];
  }

  primero(): void {
    this.posicion = 0;
  }

  siguiente(): void {
    if (this.posicion < this.elementos?.length) this.posicion += 1;
  }

  haTerminado(): boolean {
    return this.elementos?.length
      ? this.posicion >= this.elementos.length
      : true;
  }

  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}

export class IteradorAccion implements IIterador<Accion> {
  private elementos: Accion[];
  private posicion: number;

  constructor(elementos: Accion[]) {
    this.elementos = elementos;
    this.posicion = 0;
  }

  actual(): Accion {
    return this.elementos[this.posicion];
  }

  primero(): void {
    this.posicion = 0;
  }

  siguiente(): void {
    if (this.posicion < this.elementos?.length) this.posicion += 1;
  }

  haTerminado(): boolean {
    return this.elementos?.length
      ? this.posicion >= this.elementos.length
      : true;
  }

  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}

export class IteradorInformacionCliente
  implements IIterador<InformacionCliente>
{
  private elementos: InformacionCliente[];
  private filtros: any[];
  private posicion: number;

  constructor(elementos: InformacionCliente[], filtros?: any[]) {
    this.elementos = elementos;
    this.filtros = filtros ?? [];
    this.posicion = 0;
  }

  actual(): InformacionCliente {
    return this.elementos[this.posicion];
  }

  primero(): void {
    this.posicion = 0;
  }

  siguiente(): void {
    if (this.posicion < this.elementos?.length) this.posicion += 1;
  }

  haTerminado(): boolean {
    return this.elementos?.length
      ? this.posicion >= this.elementos.length
      : true;
  }

  cumpleFiltros(filtros: any[]): boolean {
    const actual = this.actual();

    // Validación 1: Es validación de...
    const esValidacion = actual.esValidacion(filtros[0]);
    // Validación 2: Es información correcta de "dato"
    const esInformacionCorrecta = actual.esInformacionCorrecta(filtros[1]);

    return esValidacion && esInformacionCorrecta;
  }
}

export class IteradorOpcionValidacion implements IIterador<OpcionValidacion> {
  private elementos: OpcionValidacion[];
  private posicion: number;

  constructor(elementos: OpcionValidacion[]) {
    this.elementos = elementos;
    this.posicion = 0;
  }

  actual(): OpcionValidacion {
    return this.elementos[this.posicion];
  }

  primero(): void {
    this.posicion = 0;
  }

  siguiente(): void {
    if (this.posicion < this.elementos.length) this.posicion += 1;
  }

  haTerminado(): boolean {
    return this.elementos?.length
      ? this.posicion >= this.elementos.length
      : true;
  }

  cumpleFiltros(filtros: any[]): boolean {
    throw new Error('Method not implemented.');
  }
}
