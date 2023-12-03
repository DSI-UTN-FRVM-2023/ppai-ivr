import { Module } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';
import { CambioEstadoLlamadaService } from './persistence.cambioestadollamada.service';
import { AccionService } from './persistence.accion.service';
import { LlamadaService } from './persistence.llamada.service';

@Module({
  providers: [
    /** Prisma client. */
    PrismaPersistenceService,
    /** Domain entity classes services. */
    AccionService,
    CambioEstadoLlamadaService,
    LlamadaService,
  ],
  exports: [LlamadaService],
})
export class PersistenceModule {}
