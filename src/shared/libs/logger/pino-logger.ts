import { injectable } from 'inversify';
import { resolve } from 'node:path';
import { Logger as PinoInstance, TransportMultiOptions, pino, transport } from 'pino';
import { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/file-system.js';

@injectable()
export class PinoLogger implements Logger {

  private readonly logger: PinoInstance;

  constructor() {
    const moduleDirectoryPath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const resultLogPath = resolve(moduleDirectoryPath, '../../../', logFilePath);

    const config: TransportMultiOptions = {
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: {}
        },
        {
          target: 'pino/file',
          level: 'info',
          options: { destination: resultLogPath }
        }
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
