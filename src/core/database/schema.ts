export const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS InterceptedApps (
    id TEXT PRIMARY KEY,
    bundleId TEXT UNIQUE NOT NULL,
    appName TEXT NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS BridgeLogs (
    id TEXT PRIMARY KEY,
    timestamp INTEGER NOT NULL,
    emotionState TEXT NOT NULL,
    interceptOutcome TEXT NOT NULL,
    targetApp TEXT NOT NULL,
    FOREIGN KEY(targetApp) REFERENCES InterceptedApps(bundleId)
);

CREATE INDEX IF NOT EXISTS idx_bridgelogs_timestamp ON BridgeLogs(timestamp);

CREATE TABLE IF NOT EXISTS AnchorTasks (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    taskDirective TEXT NOT NULL,
    durationSeconds INTEGER NOT NULL
);
`;

export const initializeDatabase = async (db: any) => {
    // Expected to be called with an expo-sqlite database instance.
    // e.g., await db.execAsync(SCHEMA_DDL);
    await db.execAsync(SCHEMA_DDL);
};
