import path from "path";

import Database from "better-sqlite3";

const db = new Database(path.join(__dirname, "../presight.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    avatar      TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    age         INTEGER NOT NULL,
    nationality TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS user_hobbies (
    user_id  INTEGER NOT NULL REFERENCES users(id),
    hobby    TEXT NOT NULL,
    PRIMARY KEY (user_id, hobby)
  );

  CREATE INDEX IF NOT EXISTS idx_users_first_name  ON users(first_name);
  CREATE INDEX IF NOT EXISTS idx_users_last_name   ON users(last_name);
  CREATE INDEX IF NOT EXISTS idx_users_nationality ON users(nationality);
  CREATE INDEX IF NOT EXISTS idx_hobbies_hobby     ON user_hobbies(hobby);
  CREATE INDEX IF NOT EXISTS idx_hobbies_user_id   ON user_hobbies(user_id);
`);

export default db;
