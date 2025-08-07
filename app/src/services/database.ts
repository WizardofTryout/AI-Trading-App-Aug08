import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('trading_app.db');

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pair TEXT NOT NULL,
        side TEXT NOT NULL,
        amount REAL NOT NULL,
        entryPrice REAL NOT NULL,
        exitPrice REAL,
        pnl REAL,
        startTime INTEGER NOT NULL,
        endTime INTEGER,
        leverage REAL NOT NULL,
        fees REAL
      )
    `);
  });
};

export default db;
