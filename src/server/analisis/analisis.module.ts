import { Module } from '@nestjs/common';
import { GestorRtaOperador } from './control/GestorRtaOperador';
import { DominioService } from '../dominio.service';
import { PantallaRtaOperador } from './boundary/PantallaRtaOperador';
import { ViewService } from './boundary/view.service';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [PantallaRtaOperador],
  providers: [GestorRtaOperador, ViewService, DominioService],
})
export class AnalisisModule {}
