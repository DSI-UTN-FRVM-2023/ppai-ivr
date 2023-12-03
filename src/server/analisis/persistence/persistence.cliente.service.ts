import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getCliente(id: number) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  public async getClientes() {
    return this.prisma.cliente.findMany();
  }
}
