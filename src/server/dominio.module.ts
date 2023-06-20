import { Module } from '@nestjs/common';
import { AnalisisModule } from './analisis/analisis.module';

@Module({
  imports: [AnalisisModule],
})
export class DominioModule {}
