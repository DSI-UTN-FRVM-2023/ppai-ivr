export class OpcionValidacion {
  private descripcion: string;
  private correcta: boolean;

  constructor(descripcion: string, correcta: boolean) {
    this.descripcion = descripcion;
    this.correcta = correcta;
  }

  setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setCorrecta(correcta: boolean): void {
    this.correcta = correcta;
  }

  getCorrecta(): boolean {
    return this.correcta;
  }

  esCorrecta(valor: string): boolean {
    return this.correcta && this.descripcion === valor;
  }
}
