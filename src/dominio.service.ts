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

@Injectable()
export class DominioService {
  readonly #logger = new Logger(DominioService.name);

  estados: Estado[] = [];
  acciones: Accion[] = [];
  categorias: CategoriaLlamada[] = [];

  constructor() {
    this.instanciarClasesSinPersistencia();
  }

  private instanciarClasesSinPersistencia(): void {
    this.#logger.debug('Instanciando clases de dominio sin persistencia...');

    // Instanciar estados del dominio.
    for (const nombre of Object.values(NombresEstado)) {
      this.#logger.debug(`Creando estado: ${nombre}`);

      this.estados.push(new Estado(nombre));
    }

    // Instanciar acciones
    for (const descripcion of Object.values(DescripcionesAccion)) {
      this.#logger.debug(`Creando acción: ${descripcion}`);

      this.acciones.push(new Accion(descripcion));
    }

    // Instanciar categorias, opciones y subopciones
    for (const categoria of Object.values(NombresCategoria)) {
      this.#logger.debug(`Creando categoría: ${categoria}`);

      // Crear subopciones
      const subopciones = [];
      let i = 1;
      for (const subopcion of Object.values(NombresSubOpcionLlamada)) {
        this.#logger.debug(`Creando subopción de ${categoria}: ${subopcion}`);

        subopciones.push(new SubOpcionLlamada(subopcion, i));
        i++;
      }

      // Crear opciones llamada
      const opciones = [];
      i = 1;
      for (const opcion of Object.values(NombresOpcionLlamada)) {
        this.#logger.debug(`Creando opción de ${categoria}: ${opcion}`);

        opciones.push(new OpcionLlamada(opcion, i, subopciones));
        i++;
      }

      this.categorias.push(new CategoriaLlamada(categoria, opciones));
    }
  }
}
