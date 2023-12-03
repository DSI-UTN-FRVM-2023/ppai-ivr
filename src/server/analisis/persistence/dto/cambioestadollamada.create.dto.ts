export interface CambioEstadoLlamadaCreateDto {
  id: number;
  fecha: Date;
  estado: string;
  idLlamada: number;
  idOperador: number;
  idTipoLlamada: number;
}
