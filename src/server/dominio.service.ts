import { Inject, Injectable, Logger } from '@nestjs/common';
import { Estado } from './analisis/entity/Estado';
import { Accion } from './analisis/entity/Accion';
import { CategoriaLlamada } from './analisis/entity/CategoriaLlamada';
import { Llamada } from './analisis/entity/Llamada';
import {
  DominioDataProviderName,
  DominioData,
} from './analisis/persistence/dominio.data.provider';

@Injectable()
export class DominioService {
  readonly logger = new Logger(DominioService.name);

  llamadaEnCurso: Llamada = null;
  categoriaLlamadaEnCurso: CategoriaLlamada = null;
  estados: Estado[] = [];
  listaAcciones: Accion[] = [];
  listaCategorias: CategoriaLlamada[] = [];

  constructor(
    @Inject(DominioDataProviderName) private readonly data: DominioData,
  ) {
    // this.instanciarClasesSinPersistencia();
    // this.buscarObjetosDominio();
    this.llamadaEnCurso = data.llamadaEnCurso;
    this.categoriaLlamadaEnCurso = data.categoriaLlamadaEnCurso;
    this.listaAcciones = data.listaAcciones;
    this.listaCategorias = data.listaCategorias;
  }
}
