export interface Command {
  getName(): string;
  execute(...paramenters: string[]): void;
}
