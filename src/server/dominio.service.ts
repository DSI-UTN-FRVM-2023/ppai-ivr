import { Injectable, Logger } from '@nestjs/common';
import { Estado, NombresEstado } from './analisis/entity/Estado';
import { Accion, DescripcionesAccion } from './analisis/entity/Accion';
import {
  CategoriaLlamada,
  NombresCategoria,
} from './analisis/entity/CategoriaLlamada';
import {
  NombresSubOpcionLlamada,
  SubOpcionLlamada,
} from './analisis/entity/SubOpcionLlamada';
import {
  NombresOpcionLlamada,
  OpcionLlamada,
} from './analisis/entity/OpcionLlamada';
import { Llamada } from './analisis/entity/Llamada';
import { Cliente } from './analisis/entity/Cliente';
import { Validacion } from './analisis/entity/Validacion';
import { OpcionValidacion } from './analisis/entity/OpcionValidacion';
import { InformacionCliente } from './analisis/entity/InformacionCliente';
import { LlamadaService } from './analisis/persistence/persistence.llamada.service';

@Injectable()
export class DominioService {
  readonly logger = new Logger(DominioService.name);

  llamadaEnCurso: Llamada = null;
  categoriaLlamadaEnCurso: CategoriaLlamada = null;
  estados: Estado[] = [];
  acciones: Accion[] = [];
  categorias: CategoriaLlamada[] = [];

  constructor(private readonly llamadas: LlamadaService) {
    // this.instanciarClasesSinPersistencia();
    this.buscarObjetosDominio();
  }

  private async buscarObjetosDominio(): Promise<void> {
    // Buscar llamada con ID '1'.
    const llamada = await this.llamadas.getLlamada(1);
  }

  private instanciarClasesSinPersistencia(): void {
    this.logger.debug('Instanciando clases de dominio sin persistencia...');

    // Instanciar acciones
    for (const descripcion of Object.values(DescripcionesAccion)) {
      this.logger.debug(`Creando acción: ${descripcion}`);

      this.acciones.push(new Accion(descripcion));
    }

    // Opciones de validacion para los ultimos 4 numeros de la tarjeta
    const opcionesNumTarjeta = [
        new OpcionValidacion('1234', false),
        new OpcionValidacion('4321', false),
        new OpcionValidacion('5678', true),
        new OpcionValidacion('8765', false),
      ],
      opcionesCodSeguridad = [
        new OpcionValidacion('123', false),
        new OpcionValidacion('321', false),
        new OpcionValidacion('456', true),
        new OpcionValidacion('654', false),
      ];

    // Crear validaciones de ejemplo.
    const validacionesSubOpcion = [
      new Validacion('Ultimos 4 números de la tarjeta', opcionesNumTarjeta),
      new Validacion('Código de seguridad de la tarjeta', opcionesCodSeguridad),
    ];

    // Instanciar categorias, opciones y subopciones
    for (const categoria of Object.values(NombresCategoria)) {
      this.logger.debug(`Creando categoría: ${categoria}`);

      // Crear subopciones
      const subopciones = [];
      let i = 1;
      for (const subopcion of Object.values(NombresSubOpcionLlamada)) {
        this.logger.debug(`Creando subopción de ${categoria}: ${subopcion}`);

        subopciones.push(
          new SubOpcionLlamada(subopcion, i, validacionesSubOpcion),
        );
        i++;
      }

      // Crear opciones llamada
      const opciones = [];
      i = 1;
      for (const opcion of Object.values(NombresOpcionLlamada)) {
        this.logger.debug(`Creando opción de ${categoria}: ${opcion}`);

        opciones.push(new OpcionLlamada(opcion, i, subopciones));
        i++;
      }

      this.categorias.push(new CategoriaLlamada(categoria, opciones));
    }

    // Crear llamada del dominio
    // Observación 3:
    //  La llamada, categoría, opción y sub-opcion (si corresponde) son recibidas desde el CU 1 Registrar Llamada, donde
    // la llamada fue creada al momento de iniciarse y asociada al cliente identificado, y la categoría y opciones fueron
    // seleccionadas por el cliente.
    const cliente = new Cliente(
      '43601084',
      'Guido Andrés Serniotti',
      '+543535123456',
    );

    // Darle información con las validaciones para que se pueda validar después.
    const numeroTarjeta = new InformacionCliente(
        '',
        validacionesSubOpcion[0],
        opcionesNumTarjeta[2],
      ),
      codSeguridad = new InformacionCliente(
        '',
        validacionesSubOpcion[1],
        opcionesCodSeguridad[2],
      );

    cliente.setInformacion([numeroTarjeta, codSeguridad]);

    // Asignar la llamada en curso.
    this.llamadaEnCurso = new Llamada(cliente);

    // Darle opciones y subopciones de selección, como si ya las hubiese seleccionado (para nuestro CU)
    const opcionSeleccionada = this.categorias[0].getOpcion()[0];

    this.llamadaEnCurso.setOpcionSeleccionada(opcionSeleccionada);
    this.llamadaEnCurso.setSubOpcionSeleccionada(
      opcionSeleccionada.getSubOpcionLlamada()[0],
    );

    // Asignar categoria de llamada iniciada.
    this.categoriaLlamadaEnCurso = this.categorias[0];
  }
}
