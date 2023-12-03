import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class EstadoService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getEstado(id: number) {
    return this.prisma.estado.findUnique({ where: { id } });
  }

  public async getEstados() {
    return this.prisma.estado.findMany();
  }
}
