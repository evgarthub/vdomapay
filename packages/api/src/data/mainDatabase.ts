import { Database, SQLQueryBindings } from "bun:sqlite";
import { join } from "path";

const createQueryWithConditions = (
  query: string,
  conditions: string | undefined
) => {
  if (conditions) {
    return `${query} WHERE ${conditions}`;
  }

  return query;
};

class MainDatabase {
  private db: Database;

  constructor() {
    console.log("Creating database");
    try {
      this.db = new Database(join(__dirname, "mainSQL.db"));
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error", error);
      this.db = new Database(join(__dirname, "mainSQL.db"), { create: true });
      console.log("Database created");
    }
  }

  async create<TValue>(
    table: string,
    data: Record<string, any>
  ): Promise<TValue | undefined> {
    const keys = Object.keys(data);
    const columns = keys.join(", ");
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const INSERT_QUERY = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING key`;
    const statement = await this.db.prepare<
      { key: number },
      SQLQueryBindings[]
    >(INSERT_QUERY);
    const insertResult = await statement.get(...values);
    statement.finalize();

    const SELECT_QUERY = `SELECT * FROM ${table} WHERE key = ${insertResult?.key}`;
    const selectStatement = this.db.query<TValue, SQLQueryBindings[]>(
      SELECT_QUERY
    );
    const result = selectStatement.get();
    selectStatement.finalize();

    return result === null ? undefined : result;
  }

  async read<TValue>(
    table: string,
    conditions?: string,
    params: SQLQueryBindings[] = []
  ): Promise<TValue[]> {
    const READ_QUERY = createQueryWithConditions(
      `SELECT * FROM ${table}`,
      conditions
    );

    const statement = await this.db.prepare<TValue, SQLQueryBindings[]>(
      READ_QUERY
    );

    const result = await statement.all(...params);

    statement.finalize();
    return result;
  }

  async update<TValue>(
    table: string,
    data: Record<string, any>,
    conditions?: string,
    params: SQLQueryBindings[] = []
  ): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const assignments = keys.map((key) => `${key} = ?`).join(", ");

    let UPDATE_QUERY = createQueryWithConditions(
      `UPDATE ${table} SET ${assignments}`,
      conditions
    );

    const statement = await this.db.prepare<TValue, SQLQueryBindings[]>(
      UPDATE_QUERY
    );

    await statement.run(...values, ...params);
    statement.finalize();
  }

  async delete(
    table: string,
    conditions?: string,
    params: SQLQueryBindings[] = []
  ): Promise<void> {
    const DELETE_QUERY = createQueryWithConditions(
      `DELETE FROM ${table}`,
      conditions
    );
    const statement = await this.db.prepare(DELETE_QUERY);
    await statement.run(...params);
    statement.finalize();
  }
}

export const mainDatabase = new MainDatabase();
