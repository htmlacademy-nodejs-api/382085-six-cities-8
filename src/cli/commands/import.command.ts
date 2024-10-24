import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Offer } from '../../shared/types/offer.type.js';
import { Command } from './command.interface.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onOfferReaded);
    fileReader.once('end', this.onImportCompleted);

    try {
      fileReader.read();
      //console.log(fileReader.toArray());
    } catch (error: unknown) {
      console.error(`Error parsing TSV file ${filename}`);
      console.error(getErrorMessage(error));
    }
  }

  onOfferReaded = (offer: Offer) => {
    console.info(offer);
  };

  onImportCompleted = (offersCount: number) => {
    console.info(`${offersCount} offers imported`);
  };
}
