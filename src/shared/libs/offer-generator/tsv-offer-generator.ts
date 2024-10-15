import { JsonServerData } from '../../types/json-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private mockData: JsonServerData
  ) {}

  generate(): string {

    return '';
  }
}
