export enum DescripcionesAccion {
  COMUNICAR_SALDO = 'Comunicar un saldo',
  DAR_BAJA_TARJETA = 'Dar de baja una tarjeta',
  DENUNCIAR_ROBO = 'Denunciar robo de una tarjeta',
}

export class Accion {
  private descripcion: string;

  constructor(descripcion: string) {
    this.descripcion = descripcion;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }
}
