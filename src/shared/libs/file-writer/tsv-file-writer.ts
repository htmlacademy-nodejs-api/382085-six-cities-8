import { FileWriter } from './file-writer.interface.js';

import { WriteStream, createWriteStream } from 'node:fs';

export class TSVFileWriter implements FileWriter {

  private stream: WriteStream;

  constructor(
    private fileName: string
  ) {
    const options = {
      flags: 'w',
      autoClose: true,
      encoding: 'utf8' as const,
    };
    this.stream = createWriteStream(this.fileName, options);
  }

  async write(data: string): Promise<void> {
    const writeSuccess = this.stream.write(`${data}\n`);

    if (!writeSuccess) {
      await new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
