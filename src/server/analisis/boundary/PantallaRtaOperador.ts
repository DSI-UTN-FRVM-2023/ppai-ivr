import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ViewService } from './view.service';
import { Request, Response } from 'express';
import { GestorRtaOperador } from '../control/GestorRtaOperador';
import { ValidacionOpcionOperador } from '../../types/validacion.opcion';

@Controller('/')
export class PantallaRtaOperador {
  private nombreCliente: string;

  private categoriaSeleccionada: string;

  private opcionSeleccionada: string;

  private nombreValidacionesOpcion: string[];
  private radioBtnValidacionesOpcion: string[];

  private subOpcionSeleccionada: string;

  private nombreValidacionesSubOpcion: string[];
  private radioBtnValidacionesSubOpcion: string[];

  private respuestaOperador: string;

  private accionARealizar: string;

  private botonConfirmacion: string;

  constructor(
    private readonly view: ViewService,
    private readonly gestor: GestorRtaOperador,
  ) {}

  @Get('/_next/*')
  static(@Req() req: Request, @Res() res: Response) {
    return this.view.getServer().getRequestHandler()(req, res);
  }

  @Get('/boundary/initial')
  async mostrarDatosLlamadaYValidacionesRequeridas(): Promise<any> {
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

  @Get('/boundary/solicitarRespuestaOperador')
  async solicitarRespuestaOperador() {
    return;
  }

  @Post('/boundary/tomarIngresoRespuesta')
  async tomarIngresoRespuesta(
    @Body() respuesta: { respuestaOperador: string },
  ) {
    this.gestor.tomarIngresoRespuesta(respuesta.respuestaOperador);
  }

  @Get('/boundary/mostrarAccionesParaSeleccion')
  /**
   * Este método no lo puede llamar el gestor directamente, pero es llamado de todas formas al finalizar el ingreso de la respuesta.
   */
  async mostrarAccionesParaSeleccion() {
    return this.gestor.accionesRequeridas;
  }

  @Post('/boundary/tomarSeleccionAccion')
  async tomarSeleccionAccion(@Body() accion: { accionSeleccionada: string }) {
    this.gestor.tomarSeleccionAccion(accion.accionSeleccionada);
  }

  @Get('/boundary/solicitarConfirmacionOperacion')
  async solicitarConfirmacionOperacion() {
    return true;
  }

  @Post('/boundary/tomarConfirmacionOperacion')
  async tomarConfirmacionOperacion() {
    return this.gestor.tomarConfirmacionOperacion();
  }

  @Get('/boundary/mostrarMensajeAccionRegistrada')
  /**
   * Este método no lo puede llamar el gestor directamente, pero es llamado de todas formas al finalizar el ingreso de la respuesta.
   */
  async mostrarMensajeAccionRegistrada() {
    return;
  }

  @Get(['/', '/fin'])
  index(@Req() req: Request, @Res() res: Response) {
    return this.view.getServer().getRequestHandler()(req, res);
  }
}
