import { config } from 'dotenv';
import { Logger } from '../logger/logger.interface.js';
import { Config } from './config.interface.js';
import { configRestSchema, RestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    private logger: Logger
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
