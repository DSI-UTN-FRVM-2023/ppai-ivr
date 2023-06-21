import { Estado } from './Estado';

export class CambioEstadoLlamada {
  #fechaHoraInicio: Date;

  #estado: Estado;

  constructor(fechaHoraInicio: Date, estado: Estado) {
    this.#fechaHoraInicio = fechaHoraInicio;
    this.#estado = estado;
  }

  setFechaHoraInicio(fechaHoraInicio: Date): void {
    this.#fechaHoraInicio = fechaHoraInicio;
  }

  getFechaHoraInicio(): Date {
    return this.#fechaHoraInicio;
  }

  setEstado(estado: Estado): void {
    this.#estado = estado;
  }

  getEstado(): Estado {
    return this.#estado;
  }
}
