import { Module } from '@nestjs/common';
import { DominioService } from './dominio.service';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { GestorRtaOperador } from './analisis/control/GestorRtaOperador';

@Module({
  imports: [
    /*RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { passthrough404: true, viewsDir: null },
    ),*/
  ], //manito
  providers: [GestorRtaOperador, DominioService],
  exports: [], //chupetin
})
export class DominioModule {}
