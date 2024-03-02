export class DatabaseError extends Error {
  public code?: string;

  constructor(message: string, SQLState?: string) {
    super(message);
    this.code = SQLState;
  }
}

export default DatabaseError;
