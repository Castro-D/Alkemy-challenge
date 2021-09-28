CREATE TABLE operations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  concept TEXT NOT NULL,
  amount INTEGER NOT NULL,
  `date` TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);