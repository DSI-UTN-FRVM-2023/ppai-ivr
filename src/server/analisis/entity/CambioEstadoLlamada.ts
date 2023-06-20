import { Estado } from './Estado';

export class CambioEstadoLlamada {
  #fechaHoraInicio: Date;
  #fechaHoraFin: Date;

  #estado: Estado;

  constructor(fechaHoraInicio: Date, fechaHoraFin: Date, estado: Estado) {
    this.#fechaHoraInicio = fechaHoraInicio;
    this.#fechaHoraFin = fechaHoraFin;
    this.#estado = estado;
  }

  setFechaHoraInicio(fechaHoraInicio: Date): void {
    this.#fechaHoraInicio = fechaHoraInicio;
  }

  getFechaHoraInicio(): Date {
    return this.#fechaHoraInicio;
  }

  setFechaHoraFin(fechaHoraFin: Date): void {
    this.#fechaHoraFin = fechaHoraFin;
  }

  getFechaHoraFin(): Date {
    return this.#fechaHoraFin;
  }

  setEstado(estado: Estado): void {
    this.#estado = estado;
  }

  getEstado(): Estado {
    return this.#estado;
  }
}
