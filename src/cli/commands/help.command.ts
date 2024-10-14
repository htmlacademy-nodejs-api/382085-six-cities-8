import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.underline('Программа для подготовки данных для REST API сервера.')}
      ${chalk.bold('Пример:')}
        ${chalk.cyan('cli.js')} ${chalk.bold.yellow('--<command>')} ${chalk.magentaBright('[arguments]')}
      ${chalk.bold('Команды:')}
          ${chalk.bold.yellow('--version')}:                      ${chalk.bgGreenBright.black('# выводит номер версии')}
          ${chalk.bold.yellow('--help')}:                         ${chalk.bgGreenBright.black('# печатает этот текст')}
          ${chalk.bold.yellow('--import')} ${chalk.magentaBright('<path>')}:                ${chalk.bgGreenBright.black('# импортирует данные из TSV')}
          ${chalk.dim('--generate <n> <path> <url>:    # генерирует произвольное количество тестовых данных')}
    `);
  }
}
