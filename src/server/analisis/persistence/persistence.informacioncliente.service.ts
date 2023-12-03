import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';

@Injectable()
export class InformacionClienteService {
  constructor(private readonly prisma: PrismaPersistenceService) {}

  public async getInformacionCliente(id: number) {
    return this.prisma.informacionCliente.findUnique({ where: { id } });
  }

  public async getInformacionesCliente() {
    return this.prisma.informacionCliente.findMany();
  }
}
