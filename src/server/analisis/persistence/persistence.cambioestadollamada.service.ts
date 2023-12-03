import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class CambioEstadoLlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getCambioEstadoLlamada(id: number) {
    return this.prisma.cambioEstadoLlamada.findUnique({ where: { id } });
  }

  public async getCambiosEstadoLlamada() {
    return this.prisma.cambioEstadoLlamada.findMany();
  }

  public async getCambiosEstadoLlamadaByLlamadaId(llamadaId: number) {
    return this.prisma.cambioEstadoLlamada.findMany({
      where: { llamadaId },
      orderBy: { fechaHoraInicio: 'desc' },
    });
  }

  public async createCambioEstadoLlamada(data: any) {
    return this.prisma.cambioEstadoLlamada.create({ data });
  }
}
