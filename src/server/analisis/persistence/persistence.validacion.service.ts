import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class ValidacionService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getValidacion(id: number) {
    return this.prisma.validacion.findUnique({
      where: { id },
      include: {
        opcionesValidacion: true,
      },
    });
  }

  public async getValidaciones() {
    return this.prisma.validacion.findMany({
      include: {
        opcionesValidacion: true,
      },
    });
  }
}
