import { injectable, inject } from 'inversify';

import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';

import { RestSchema } from '../shared/libs/config/rest.schema.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async init() {
    this.logger.info('Rest application initialization');
    this.logger.info(`port is ${this.config.get('PORT')}`);
    this.logger.info(`port is ${this.config.get('SALT')}`);
    this.logger.info(`port is ${this.config.get('DB_HOST')}`);
  }
}

