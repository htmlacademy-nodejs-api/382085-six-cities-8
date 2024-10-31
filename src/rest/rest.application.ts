import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';

export class RestApplication {

  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>
  ) {}

  public async init() {
    this.logger.info('Rest application initialization');
    this.logger.info(`port is ${this.config.get('PORT')}`);
    this.logger.info(`port is ${this.config.get('SALT')}`);
    this.logger.info(`port is ${this.config.get('DB_HOST')}`);
  }
}

