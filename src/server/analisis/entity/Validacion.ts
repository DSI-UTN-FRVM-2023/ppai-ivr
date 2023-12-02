import {
  IColeccion,
  IteradorOpcionValidacion,
} from '../pattern/IteratorPattern';
import { OpcionValidacion } from './OpcionValidacion';

export class Validacion implements IColeccion<OpcionValidacion> {
  private mensajeValidacion: string;

  private opcionesValidacion: OpcionValidacion[];

  constructor(
    mensajeValidacion: string,
    opcionesValidacion: OpcionValidacion[],
  ) {
    this.mensajeValidacion = mensajeValidacion;
    this.opcionesValidacion = opcionesValidacion;
  }

  setMensajeValidacion(mensajeValidacion: string): void {
    this.mensajeValidacion = mensajeValidacion;
  }

  getMensajeValidacion(): string {
    return this.mensajeValidacion;
  }

  setOpcionesValidacion(opcionesValidacion: OpcionValidacion[]): void {
    this.opcionesValidacion = opcionesValidacion;
  }

  crearIterador(elementos: OpcionValidacion[]): IteradorOpcionValidacion {
    const nuevo = new IteradorOpcionValidacion(elementos);

    return nuevo;
  }

  getOpcionesValidacion(): string[] {
    // Crear iterador.
    const nuevo = this.crearIterador(this.opcionesValidacion);

    // Declarar array de las descripciones de las opciones.
    const opciones: string[] = [];

    // Posicionar en el primer indice.
    nuevo.primero();

    // Comenzar iteración.
    while (!nuevo.haTerminado()) {
      // Obtener actual de la iteración.
      const actual = nuevo.actual();

      // Obtener descripcion del elemento.
      const descripcion = actual.getDescripcion();

      // Agregar descripción al array.
      opciones.push(descripcion);

      // Avanzar iteración.
      nuevo.siguiente();
    }

    return opciones;
  }
}
