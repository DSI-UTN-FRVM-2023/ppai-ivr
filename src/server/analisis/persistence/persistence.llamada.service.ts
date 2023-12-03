import { Injectable } from '@nestjs/common';
import { PrismaPersistenceService } from './persistence.prisma.service';
import { validateConfig } from 'next/dist/server/config-shared';

@Injectable()
export class LlamadaService {
  constructor(private readonly prisma: PrismaPersistenceService) {}
  
  public async getLlamada(id: number) {
    return this.prisma.llamada.findUnique({
      where: { id },
      include: {
        cliente: {
          include: {
            info: {
              include: {
                opcionCorrecta: true,
                validacion: {
                  include: {
                    opcionesValidacion: true,
                  },
                },
              },
            },
          },
        },
        opcionSeleccionada: {
          include: {
            validacionesRequeridas: {
              include: {
                opcionesValidacion: true,
              },
            },
            CategoriaLlamada: true,
          },
        },
        subOpcionSeleccionada: {
          include: {
            validacionesRequeridas: {
              include: {
                opcionesValidacion: true,
              },
            },
          },
        },
        estadoActual: true,
        cambioEstado: {
          include: {
            estado: true,
          },
        },
      },
    });
  }

  public async getLlamadas() {
    return this.prisma.llamada.findMany();
  }
}
