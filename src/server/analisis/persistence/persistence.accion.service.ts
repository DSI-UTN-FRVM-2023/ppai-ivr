import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class AccionService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getAccion(id: number) {
    return this.prisma.accion.findUnique({ where: { id } });
  }

  public async getAcciones() {
    return this.prisma.accion.findMany();
  }
}
