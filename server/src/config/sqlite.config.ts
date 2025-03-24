import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
/* import { DatabaseError } from "../common/errors/errors.js";
import { logger } from "../common/utils/loggers.js"; */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const dbPath = path.resolve(__dirname, "../../database.db");

// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         throw new DatabaseError("Database opening error")
//         console.error("Database opening error: ", err.message);
//     } else {
//         logger.info("Successful connection to the database");
//     }
// })

let db: Database;

export async function getDB(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: path.resolve(__dirname, "../../database.db"),
      driver: sqlite3.Database,
    });

    const sql = `
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                completed BOOLEAN NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

    try {
      await db.exec(sql);
    } catch (err) {
      throw new Error("Error creating table");
    }
  }
  return db;
}
