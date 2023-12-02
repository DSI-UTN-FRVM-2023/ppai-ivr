import { Logger, OnModuleInit } from '@nestjs/common';
import { NextServer } from 'next/dist/server/next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Next = require('next');

export class ViewService implements OnModuleInit {
  readonly logger = new Logger(ViewService.name);

  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
      });

      await this.server.prepare();
    } catch (e) {
      this.logger.error(`Fallo crítico al iniciar Next.js: ${e}`);
      throw e;
    }
  }

  getServer(): NextServer {
    return this.server;
  }
}
