import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class CategoriaLlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getCategoriaLlamada(id: number) {
    return this.prisma.categoriaLlamada.findUnique({ where: { id } });
  }

  public async getCategoriasLlamada() {
    return this.prisma.categoriaLlamada.findMany();
  }
}