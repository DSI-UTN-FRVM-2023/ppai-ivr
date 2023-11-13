import { CambioEstadoLlamada } from "./CambioEstadoLlamada";
import { Llamada } from "./Llamada";

export enum NombresEstado {
  INICIADA = 'Iniciada',
  EN_CURSO = 'En Curso',
  FINALIZADO = 'Finalizado',
}

export abstract class Estado {
  #nombre: string;

  constructor(nombre: string) {
    this.#nombre = nombre;
  }

  setNombre(nombre: string): void {
    this.#nombre = nombre;
  }

  getNombre(): string {
    return this.#nombre;
  }

  esEnCurso(): boolean {
    return this.#nombre === NombresEstado.EN_CURSO;
  }

  esFinalizado(): boolean {
    return this.#nombre === NombresEstado.FINALIZADO;
  }

  tomarPorOperador(): void {}

  finalizarLlamada(this: Llamada, fechaHoraActual: Date): void {}

  finalizar(): void {}

  cancelar(): void {}

  descartarLlamada(): void {}

  marcarLlamadaParaRevisar(): void {}

  marcarLlamadaParaEscuchar(): void {}

  confirmarLlamadaOk(): void {}

  public crearNuevoCambioEstado(e: Estado, fechaHoraInicio: Date): CambioEstadoLlamada {
    return new CambioEstadoLlamada(fechaHoraInicio, e);
  }
}
