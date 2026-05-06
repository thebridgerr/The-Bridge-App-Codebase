import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { initializeDatabase } from '../src/core/database/schema';

export default function RootLayout() {
  useEffect(() => {
    async function initDB() {
      if (Platform.OS !== 'web') {
        try {
          const db = await SQLite.openDatabaseAsync('bridge.db');
          await initializeDatabase(db);
        } catch (e) {
          console.warn("DB init failed", e);
        }
      }
    }
    initDB();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0A0A0A' } }} />
    </>
  );
}
