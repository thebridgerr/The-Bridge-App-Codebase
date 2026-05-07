import * as SQLite from 'expo-sqlite';

class DatabaseManager {
  private static instance: DatabaseManager;
  private db: SQLite.SQLiteDatabase;

  private constructor() {
    // SDK 50+ uses synchronous DB opening for instant local-first access
    this.db = SQLite.openDatabaseSync('thebridge.db');
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Abstracted transaction wrapper for SDK 50+.
   * Automatically routes to `getAllAsync` for reads and `runAsync` for writes, 
   * ensuring atomic execution and clean call-sites.
   */
  public async executeSql(query: string, params: any[] = []): Promise<any> {
    try {
      let result: any;
      await this.db.withTransactionAsync(async () => {
        const isSelect = query.trim().toUpperCase().startsWith('SELECT');
        if (isSelect) {
          result = await this.db.getAllAsync(query, params);
        } else {
          result = await this.db.runAsync(query, params);
        }
      });
      return result;
    } catch (error) {
      console.error('[DATABASE_ERR] executeSql failed:', error);
      throw error;
    }
  }

  /**
   * Initializes the exact DDL schema mapped in CONTEXT_MAP.md.
   */
  public async init(): Promise<void> {
    try {
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS Affirmations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT NOT NULL,
          content TEXT NOT NULL
        );
        
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS InterceptedApps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bundleId TEXT UNIQUE NOT NULL,
          appName TEXT,
          isActive INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS BridgeLogs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          emotionState TEXT,
          interceptOutcome TEXT,
          targetApp TEXT
        );

        CREATE TABLE IF NOT EXISTS AnchorTasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT NOT NULL,
          taskDirective TEXT NOT NULL,
          durationSeconds INTEGER NOT NULL
        );
      `);
      console.log('[SYSTEM] Database initialized successfully.');
    } catch (error) {
      console.error('[SYSTEM] Database initialization failed:', error);
    }
  }
}

// Export Singleton instance
export const dbManager = DatabaseManager.getInstance();