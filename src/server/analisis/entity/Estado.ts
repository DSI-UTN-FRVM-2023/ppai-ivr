import { CambioEstadoLlamada } from './CambioEstadoLlamada';
import { Llamada } from './Llamada';

export enum NombresEstado {
  INICIADA = 'Iniciada',
  EN_CURSO = 'En Curso',
  FINALIZADO = 'Finalizada',
}

export abstract class Estado {
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getNombre(): string {
    return this.nombre;
  }

  esEnCurso(): boolean {
    return this.nombre === NombresEstado.EN_CURSO;
  }

  esFinalizado(): boolean {
    return this.nombre === NombresEstado.FINALIZADO;
  }

  abstract tomadaPorOperador(object: Llamada, fechaHora: Date): void;

  abstract finalizarLlamada(object: Llamada, fechaHora: Date): void;

  abstract finalizar(): void;

  abstract cancelar(): void;

  abstract descartarLlamada(): void;

  abstract marcarLlamadaParaRevisar(): void;

  abstract marcarLlamadaParaEscuchar(): void;

  abstract confirmarLlamadaOk(): void;

  public crearNuevoCambioEstado(
    e: Estado,
    fechaHoraInicio: Date,
  ): CambioEstadoLlamada {
    return new CambioEstadoLlamada(fechaHoraInicio, e);
  }
}
