export class CLIError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "CLIError";
  }
}
