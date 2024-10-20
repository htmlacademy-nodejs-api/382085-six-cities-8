#!/usr/bin/env/node

import { CLIApplication } from './cli/cli-application.js';
import { GenerateCommand } from './cli/commands/generate.command.js';
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new ImportCommand(),
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}


bootstrap();
