import { Estado } from '../entity/Estado';
import { Llamada } from '../entity/Llamada';

export class Finalizada extends Estado {
  constructor() {
    super('Finalizada');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class EnCurso extends Estado {
  constructor() {
    super('En Curso');
  }

  private crearEstadoFinalizada(): Finalizada {
    return new Finalizada();
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    const estadoFinalizada = this.crearEstadoFinalizada();

    const cambioEstado = super.crearNuevoCambioEstado(
      estadoFinalizada,
      fechaHora,
    );

    object.setEstadoActual(estadoFinalizada);
    object.agregarCambioEstado(cambioEstado);
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class Iniciado extends Estado {
  constructor() {
    super('Iniciado');
  }

  private crearEstadoEnCurso(): EnCurso {
    return new EnCurso();
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    const estadoEnCurso = this.crearEstadoEnCurso();

    const cambioEstado = super.crearNuevoCambioEstado(estadoEnCurso, fechaHora);

    object.setEstadoActual(estadoEnCurso);
    object.agregarCambioEstado(cambioEstado);
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class EscuchaCorrecta extends Estado {
  constructor() {
    super('Escucha Correcta');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class EnEscuchaConObservacion extends Estado {
  constructor() {
    super('En Escucha con Observación');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class PendienteDeEscucha extends Estado {
  constructor() {
    super('Pendiente de Escucha');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class Descartado extends Estado {
  constructor() {
    super('Descartado');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}

export class Cancelada extends Estado {
  constructor() {
    super('Cancelada');
  }

  tomadaPorOperador(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizarLlamada(object: Llamada, fechaHora: Date): void {
    throw new Error('Method not implemented.');
  }

  finalizar(): void {
    throw new Error('Method not implemented.');
  }

  cancelar(): void {
    throw new Error('Method not implemented.');
  }

  descartarLlamada(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaRevisar(): void {
    throw new Error('Method not implemented.');
  }

  marcarLlamadaParaEscuchar(): void {
    throw new Error('Method not implemented.');
  }

  confirmarLlamadaOk(): void {
    throw new Error('Method not implemented.');
  }
}
