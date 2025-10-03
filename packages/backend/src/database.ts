import { Database } from 'bun:sqlite';

const db = new Database('database.sqlite', { create: true });

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database tables FIRST
function initializeTables() {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create indexes
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)');
  db.run('CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)');
}

// Initialize tables immediately
initializeTables();

export function initializeDatabase() {
  console.log('✅ Database initialized');
}

// User queries - prepared AFTER tables exist
export const userQueries = {
  create: db.prepare(`
    INSERT INTO users (id, email, password, name)
    VALUES (?, ?, ?, ?)
  `),
  
  findByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),
  
  findById: db.prepare(`
    SELECT id, email, name, created_at FROM users WHERE id = ?
  `),
  
  getAll: db.prepare(`
    SELECT id, email, name, created_at FROM users
  `)
};

// Session queries
export const sessionQueries = {
  create: db.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at)
    VALUES (?, ?, ?, ?)
  `),
  
  findByToken: db.prepare(`
    SELECT * FROM sessions 
    WHERE token = ? AND expires_at > datetime('now')
  `),
  
  deleteByToken: db.prepare(`
    DELETE FROM sessions WHERE token = ?
  `),
  
  deleteExpired: db.prepare(`
    DELETE FROM sessions WHERE expires_at <= datetime('now')
  `),
  
  deleteByUserId: db.prepare(`
    DELETE FROM sessions WHERE user_id = ?
  `)
};

// Clean up expired sessions periodically
setInterval(() => {
  const result = sessionQueries.deleteExpired.run();
  if (result.changes > 0) {
    console.log(`🧹 Cleaned up ${result.changes} expired sessions`);
  }
}, 60000); // Every minute

export default db;
