import { Module } from '@nestjs/common';
import { GestorRtaOperador } from './control/GestorRtaOperador';
import { DominioService } from '../dominio.service';
import { PantallaRtaOperador } from './boundary/PantallaRtaOperador';
import { ViewService } from './boundary/view.service';

@Module({
  controllers: [PantallaRtaOperador],
  providers: [GestorRtaOperador, ViewService, DominioService],
})
export class AnalisisModule {}
