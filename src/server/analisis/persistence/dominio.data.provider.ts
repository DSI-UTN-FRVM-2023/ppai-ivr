import { Logger, Provider } from '@nestjs/common';
import { AccionService } from './persistence.accion.service';
import { CategoriaLlamadaService } from './persistence.categoriallamada.service';
import { ClienteService } from './persistence.cliente.service';
import { InformacionClienteService } from './persistence.informacioncliente.service';
import { LlamadaService } from './persistence.llamada.service';
import { OpcionLlamadaService } from './persistence.opcionllamada.service';
import { SubopcionLlamadaService } from './persistence.subopcionllamada.service';
import { ValidacionService } from './persistence.validacion.service';
import { Accion } from '../entity/Accion';
import { CategoriaLlamada } from '../entity/CategoriaLlamada';
import { Llamada } from '../entity/Llamada';
import { Validacion } from '../entity/Validacion';
import { InformacionCliente } from '../entity/InformacionCliente';
import { Cliente } from '../entity/Cliente';
import { OpcionValidacion } from '../entity/OpcionValidacion';
import { OpcionLlamada } from '../entity/OpcionLlamada';
import { SubOpcionLlamada } from '../entity/SubOpcionLlamada';
import { Estado } from '../entity/Estado';
import { Iniciado } from '../pattern/StatePattern';
import { CambioEstadoLlamada } from '../entity/CambioEstadoLlamada';

export type DominioData = {
  llamadaEnCurso: Llamada;
  categoriaLlamadaEnCurso: CategoriaLlamada;
  listaAcciones: Accion[];
  listaCategorias: CategoriaLlamada[];
  listaValidacionesSinKey: Validacion[];
  listaInformaciones: InformacionCliente[];
  listaClientes: Cliente[];
  listaOpciones: Record<number, OpcionLlamada>;
  listaOpcionesSinKey: OpcionLlamada[];
};

export const DominioDataProviderName = 'DominioDataProvider';

/**
 * ESTO ES HORRENDO, PERO NO IMPORTA :)
 */
export const DominioDataProvider: Provider = {
  provide: DominioDataProviderName,
  useFactory: async (
    llamadas: LlamadaService,
    acciones: AccionService,
    validaciones: ValidacionService,
    categorias: CategoriaLlamadaService,
    opciones: OpcionLlamadaService,
    subOpciones: SubopcionLlamadaService,
    clientes: ClienteService,
    informaciones: InformacionClienteService,
  ): Promise<DominioData> => {
    const logger = new Logger(DominioDataProviderName, { timestamp: true });

    // Lista de datos.
    const listaAcciones: Accion[] = [],
      listaCategorias: CategoriaLlamada[] = [];
    let llamadaEnCurso: Llamada = null,
      categoriaLlamadaEnCurso: CategoriaLlamada = null;

    logger.debug(`Cargando objetos persistentes...`);

    // Buscar acciones de la db.
    const dbAcciones = await acciones.getAcciones();

    // Crear instancias de accion.
    for (const accion of dbAcciones)
      listaAcciones.push(new Accion(accion.descripcion));

    // Buscar opciones de validacion.
    const dbValidaciones = await validaciones.getValidaciones();

    // Buscar clientes.
    const dbClientes = await clientes.getClientes();

    // Crear instancias de las opciones de validacion para cada validacion y asociarlas a una nueva instancia de validacion.
    const listaValidaciones: Record<number, Validacion> = {},
      listaInformaciones: InformacionCliente[] = [],
      listaClientes: Cliente[] = [];
    for (const validacion of dbValidaciones) {
      const opcionesValidacion: OpcionValidacion[] = [];

      for (const opcion of validacion.opcionesValidacion) {
        // Crear instancia de opcionvalidacion
        const { descripcion, correcta } = opcion;

        const instancia = new OpcionValidacion(descripcion, correcta);
        opcionesValidacion.push(instancia);
      }

      const instanciaValidacion = new Validacion(
        validacion.mensajeValidacion,
        opcionesValidacion,
      );

      listaValidaciones[validacion.id] = instanciaValidacion;

      // Asignar validaciones a los clientes.
      for (const cliente of dbClientes) {
        const dbInformaciones =
          await informaciones.getInformacionesClienteByCliente(cliente.id);

        for (const informacion of dbInformaciones) {
          if (informacion.validacionId === validacion.id) {
            // Buscar opcion validacion de la validacion.
            const opcionValidacion = opcionesValidacion.find((opcion) =>
              opcion.getCorrecta(),
            );

            // Crear instancia de informacioncliente
            const instancia = new InformacionCliente(
              informacion.datoAValidar,
              instanciaValidacion,
              opcionValidacion,
            );

            listaInformaciones.push(instancia);
          }
        }

        listaClientes.push(
          new Cliente(
            cliente.dni,
            cliente.nombreCompleto,
            cliente.nroCelular,
            listaInformaciones,
          ),
        );
      }
    }

    const listaValidacionesSinKey: Validacion[] = [];
    for (const key of Object.keys(listaValidaciones))
      listaValidacionesSinKey.push(listaValidaciones[key]);

    // Crear instancias de OpcionLlamada y SubOpcionLlamada.
    // Traer categorias de la db.
    const dbCategorias = await categorias.getCategoriasLlamada();

    const listaOpciones: Record<number, OpcionLlamada> = {},
      listaOpcionesSinKey: OpcionLlamada[] = [];
    for (const categoria of dbCategorias) {
      // Buscar opciones de esa categoria.
      const dbOpciones = await opciones.getOpcionesLlamadaByCategoria(
        categoria.id,
      );

      for (const opcion of dbOpciones) {
        // Buscar subopciones de esa categoria.
        const dbSubopciones =
          await subOpciones.getSubopcionesLlamadaByOpcionLlamada(opcion.id);

        const listaSubOpciones: SubOpcionLlamada[] = [];
        for (const subOpcion of dbSubopciones) {
          listaSubOpciones.push(
            new SubOpcionLlamada(
              subOpcion.nombre,
              subOpcion.nroOrden,
              listaValidacionesSinKey,
            ),
          );
        }

        listaOpciones[opcion.id] = new OpcionLlamada(
          opcion.nombre,
          opcion.nroOrden,
          listaSubOpciones,
        );
        listaOpcionesSinKey.push(listaOpciones[opcion.id]);
      }

      listaCategorias.push(
        new CategoriaLlamada(categoria.nombre, listaOpcionesSinKey),
      );
    }

    // Crear la Llamada.
    const llamada = await llamadas.getLlamada(1);

    // Crear las instancias de Estado.
    let estado: Estado;
    if (llamada.estadoActual.nombre === 'Iniciado') estado = new Iniciado();

    // Crear las instancias de los cambios de estado.
    const cambiosEstado: CambioEstadoLlamada[] = [];
    for (const cambios of llamada.cambioEstado) {
      cambiosEstado.push(
        new CambioEstadoLlamada(cambios.fechaHoraInicio, estado),
      );
    }

    llamadaEnCurso = new Llamada(listaClientes[0], estado, cambiosEstado);
    llamadaEnCurso.setOpcionSeleccionada(listaOpciones[1]);
    llamadaEnCurso.setSubOpcionSeleccionada(
      listaOpciones[1].getSubOpcionLlamada()[0],
    );

    categoriaLlamadaEnCurso = listaCategorias[0];

    logger.debug(`Carga de objetos persistentes finalizada.`);

    return {
      llamadaEnCurso,
      categoriaLlamadaEnCurso,
      listaAcciones,
      listaCategorias,
      listaValidacionesSinKey,
      listaInformaciones,
      listaClientes,
      listaOpciones,
      listaOpcionesSinKey,
    };
  },
  inject: [
    LlamadaService,
    AccionService,
    ValidacionService,
    CategoriaLlamadaService,
    OpcionLlamadaService,
    SubopcionLlamadaService,
    ClienteService,
    InformacionClienteService,
  ],
};
