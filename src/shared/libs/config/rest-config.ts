import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { Config } from './config.interface.js';

import { Logger } from '../logger/index.js';
import { Component } from '../../types/index.js';

import { configRestSchema, RestSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsed = config();

    if (parsed.error) {
      throw new Error('Can not parse config');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });
    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
