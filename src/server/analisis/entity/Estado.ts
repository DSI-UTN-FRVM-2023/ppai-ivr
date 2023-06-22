export enum NombresEstado {
  INICIADA = 'Iniciada',
  EN_CURSO = 'En Curso',
  FINALIZADO = 'Finalizado',
}

export class Estado {
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
}
