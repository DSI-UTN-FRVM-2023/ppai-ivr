import { Module } from '@nestjs/common';
import { DominioDataProvider } from './dominio.data.provider';
import { PersistentDataModule } from './persistence.data.module';

@Module({
  imports: [PersistentDataModule],
  providers: [DominioDataProvider],
  exports: [DominioDataProvider],
})
export class PersistenceModule {}
