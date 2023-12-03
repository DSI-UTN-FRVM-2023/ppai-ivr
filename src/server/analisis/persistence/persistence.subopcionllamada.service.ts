import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class SubopcionLlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getSubopcionLlamada(id: number) {
    return this.prisma.subOpcionLlamada.findUnique({ where: { id } });
  }

  public async getSubopcionesLlamada() {
    return this.prisma.subOpcionLlamada.findMany();
  }
}