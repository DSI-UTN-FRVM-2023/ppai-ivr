import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class OpcionValidacionService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getOpcionValidacion(id: number) {
    return this.prisma.opcionValidacion.findUnique({ where: { id } });
  }

  public async getOpcionesValidacion() {
    return this.prisma.opcionValidacion.findMany();
  }
}