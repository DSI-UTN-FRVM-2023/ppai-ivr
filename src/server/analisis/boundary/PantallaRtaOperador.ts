import { Controller, Get, Req, Res } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { GestorRtaOperador } from '../control/GestorRtaOperador';

@Controller('/')
export class PantallaRtaOperador {
  constructor(
    private readonly view: ViewService,
    private readonly gestor: GestorRtaOperador,
  ) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    return this.view.getServer().getRequestHandler()(req, res);
  }
}
