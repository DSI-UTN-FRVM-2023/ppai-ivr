import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { PantallaRtaOperador } from './PantallaRtaOperador';
import { DominioModule } from '../../dominio.module';

@Module({
  imports: [DominioModule],
  controllers: [PantallaRtaOperador],
  providers: [ViewService],
})
export class ViewModule {}
