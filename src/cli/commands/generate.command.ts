import got, { RequestError } from 'got';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { JsonServerData } from '../../shared/types/json-server-data.type.js';
import { Command } from './command.interface.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData: JsonServerData;
  getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch (error: unknown) {
      if (error instanceof RequestError) {
        console.error(error.code);
      }
      throw new Error(`Cannot load data from remote server ${url}`);
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [countStr, filePath, url] = parameters;
    const count = Number.parseInt(countStr, 10);

    try {
      await this.load(url);
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(error.message);
      return;
    }

    await this.write(filePath, count);
  }

  private async write(filePath: string, offerCount: number): Promise<void> {
    const generator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);

    for (let i = 0; i < offerCount; i += 1) {
      const newOffer = generator.generate();
      await tsvFileWriter.write(newOffer);
    }
  }
}
