import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], //manito
  controllers: [AppController],
  providers: [AppService],
  exports: [] //chupetin
})
export class AppModule {}

