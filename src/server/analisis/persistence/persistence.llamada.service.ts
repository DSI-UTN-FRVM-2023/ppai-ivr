import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class LlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getLlamada(id: number) {
    return this.prisma.llamada.findUnique({ where: { id } });
  }

  public async getLlamadas() {
    return this.prisma.llamada.findMany();
  }
}
