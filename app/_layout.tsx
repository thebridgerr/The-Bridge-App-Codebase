import '../global.css';
import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

// Data Layer (using the @/ alias convention)
import { dbManager } from '@/core/database/DatabaseManager';
import { seedAnchorTasks, seedAffirmations } from '@/core/database/seeder';

export default function RootLayout() {
  const[isDbReady, setIsDbReady] = useState(false);

  
  const[fontsLoaded, fontError] = useFonts({
    'JetBrainsMono-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  useEffect(() => {
    async function initDataLayer() {
      // expo-sqlite is native-only. Bypass logic if running on web (dev environments).
      if (Platform.OS === 'web') {
        setIsDbReady(true);
        return;
      }

      try {
        await dbManager.init();
        
        await seedAnchorTasks();
        await seedAffirmations();
      } catch (error) {
        console.error('[CRITICAL_ERR] Failed to initialize local SQLite database:', error);
        // We do not hard-lock the user. We allow the app to render and gracefully 
        // degrade or retry actions later.
      } finally {
        setIsDbReady(true);
      }
    }

    initDataLayer();
  },[]);

  // Monitor Font Errors without blocking execution
  useEffect(() => {
    if (fontError) {
      console.error('[CRITICAL_ERR] Failed to load JetBrains Mono typography:', fontError);
    }
  }, [fontError]);

  // STATE GUARD: Ensure both Database and Typography are strictly loaded
  const isReady = isDbReady && (fontsLoaded || fontError);

  if (!isReady) {
    // Pure Black (#000000) view prevents white flashes during the async handshake
    return <View style={{ flex: 1, backgroundColor: '#000000' }} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          // Deep Obsidian base from our Design Tokens
          contentStyle: { backgroundColor: '#0A0A0A' },
          // Hard terminal cuts, no soft sliding animations
          animation: 'none' 
        }} 
      />
    </>
  );
}