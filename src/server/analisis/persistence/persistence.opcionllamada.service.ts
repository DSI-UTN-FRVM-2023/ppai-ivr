import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class OpcionLlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getOpcionLlamada(id: number) {
    return this.prisma.opcionLlamada.findUnique({ where: { id } });
  }

  public async getOpcionesLlamada() {
    return this.prisma.opcionLlamada.findMany();
  }

  public async getOpcionesLlamadaByCategoria(categoria: number) {
    return this.prisma.opcionLlamada.findMany({
      where: { categoriaLlamadaId: categoria },
    });
  }
}
