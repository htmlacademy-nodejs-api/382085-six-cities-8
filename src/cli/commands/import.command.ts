import { TSVFileReader } from '../../shared/libs/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error: unknown) {
      console.error(`Error parsing TSV file ${filename}`);
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(error.message);
    }
  }
}
