import { injectable } from 'inversify';
import { Logger as PinoInstance, TransportMultiOptions, pino, transport } from 'pino';
import { Logger } from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {

  private readonly logger: PinoInstance;

  constructor() {

    // логирование в stdout
    const config: TransportMultiOptions = {
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: {} // по умолчанию destination: 1 что означает дескриптор stdout
        },
      ]
    };

    const fileTransport = transport(config);

    this.logger = pino({}, fileTransport);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
}
