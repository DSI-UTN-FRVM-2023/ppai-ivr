import { Module } from '@nestjs/common';
import { AccionService } from './persistence.accion.service';
import { CambioEstadoLlamadaService } from './persistence.cambioestadollamada.service';
import { CategoriaLlamadaService } from './persistence.categoriallamada.service';
import { ClienteService } from './persistence.cliente.service';
import { EstadoService } from './persistence.estado.service';
import { InformacionClienteService } from './persistence.informacioncliente.service';
import { LlamadaService } from './persistence.llamada.service';
import { OpcionLlamadaService } from './persistence.opcionllamada.service';
import { OpcionValidacionService } from './persistence.opcionvalidacion.service';
import { PrismaPersistenceService } from './persistence.prisma.service';
import { SubopcionLlamadaService } from './persistence.subopcionllamada.service';
import { ValidacionService } from './persistence.validacion.service';

@Module({
  providers: [
    /** Prisma client. */
    PrismaPersistenceService,
    /** Domain entity classes services. */
    AccionService,
    CambioEstadoLlamadaService,
    CategoriaLlamadaService,
    ClienteService,
    EstadoService,
    InformacionClienteService,
    LlamadaService,
    OpcionLlamadaService,
    OpcionValidacionService,
    SubopcionLlamadaService,
    ValidacionService,
  ],
  exports: [
    AccionService,
    CambioEstadoLlamadaService,
    CategoriaLlamadaService,
    ClienteService,
    EstadoService,
    InformacionClienteService,
    LlamadaService,
    OpcionLlamadaService,
    OpcionValidacionService,
    SubopcionLlamadaService,
    ValidacionService,
  ],
})
export class PersistentDataModule {}
