import { Body, Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { GestorRtaOperador } from '../control/GestorRtaOperador';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';

@Controller('/')
export class PantallaRtaOperador {
  constructor(
    private readonly view: ViewService,
    private readonly gestor: GestorRtaOperador,
  ) {}

  @Get('/_next/*')
  static(@Req() req: Request, @Res() res: Response) {
    return this.view.getServer().getRequestHandler()(req, res);
  }

  @Get('/boundary/initial')
  async initial(): Promise<any> {
    const info = this.gestor.nuevaRespuestaOperador();

    return info;
  }

  @Post('/boundary/tomarIngresoDatoValidacion')
  async tomarIngresoDatoValidacion(
    @Body() datoValidacion: ValidacionOpcionOperador,
  ) {
    const resultado = this.gestor.tomarIngresoDatoValidacion(datoValidacion);

    return resultado;
  }

  @Get('/')
  index(@Req() req: Request, @Res() res: Response) {
    const info = this.gestor.nuevaRespuestaOperador();

    return this.view.getServer().getRequestHandler()(req, res);
  }
}
