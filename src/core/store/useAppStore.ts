import { create } from 'zustand';
import { router } from 'expo-router';
import { dbManager } from '../database/DatabaseManager';

export interface AnchorTask {
  id: number;
  category: string;
  taskDirective: string;
  durationSeconds: number;
}

interface AppState {
  // Existing Phase 2 UI State
  activeEmotion: string;
  activeEmotionColor: string;
  
  // New Phase 3 Intercept State
  isIntercepted: boolean;
  activeAppBundle: string | null;

  // Actions
  setActiveEmotion: (emotion: string, color: string) => void;
  handleIncomingIntercept: (bundleId: string) => Promise<void>;
  resetSession: () => void;
  currentAnchorTask: AnchorTask | null;
  selectRandomTask: (emotion: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // --- INITIAL STATE ---
  activeEmotion: '',
  activeEmotionColor: '#00EEFF', // Default Intercept Cyan
  isIntercepted: false,
  activeAppBundle: null,
  currentAnchorTask: null,

  selectRandomTask: async (emotion: string) => {
    try {
      // 1. Query local SQLite for tasks matching the emotion
      const query = 'SELECT * FROM AnchorTasks WHERE category = ?';
      
      // Because we wrapped executeSql with SDK 50's `getAllAsync` for SELECTs, it returns an array
      const tasks = await dbManager.executeSql(query, [emotion]);

      if (tasks && tasks.length > 0) {
        // 2. Randomize picking logic
        const randomIndex = Math.floor(Math.random() * tasks.length);
        set({ currentAnchorTask: tasks[randomIndex] });
      } else {
        // Fallback safety if the DB query fails or table is empty
        console.warn(`[SYSTEM] No tasks found for ${emotion}. Using fallback.`);
        set({
          currentAnchorTask: {
            id: 999,
            category: emotion,
            taskDirective: 'CLOSE YOUR EYES. BREATHE SLOWLY.',
            durationSeconds: 60,
          }
        });
      }
    } catch (error) {
      console.error('[DB_ERR] Failed to fetch random anchor task:', error);
    }
  },

  // --- ACTIONS ---

  // Legacy/UI Action (Preserved for your existing components)
  setActiveEmotion: (emotion: string, color: string) => 
    set({ activeEmotion: emotion, activeEmotionColor: color }),

  // Phase 3: The Interception Handshake
  handleIncomingIntercept: async (bundleId: string) => {
    // 1. Lock Intercept State
    set({ isIntercepted: true, activeAppBundle: bundleId });

    // 2. Telemetry Log (Strictly Local)
    try {
      const insertQuery = `
        INSERT INTO BridgeLogs (emotionState, interceptOutcome, targetApp) 
        VALUES (?, ?, ?)
      `;
      // Logged as 'Pending' until the user selects their emotion later in the flow
      await dbManager.executeSql(insertQuery,['UNKNOWN', 'Pending', bundleId]);
      console.log(`[INTERCEPT] Logged pending breach for target: ${bundleId}`);
    } catch (error) {
      console.error('[INTERCEPT_ERR] Failed to log intercept attempt:', error);
    }

    // 3. Force Route change to your existing UI
    router.replace('/Interceptor');
  },

  // State Purge (Called by Dashboard when closing the loop)
  resetSession: () => set({ 
    activeEmotion: '', 
    activeEmotionColor: '#00EEFF',
    isIntercepted: false, 
    activeAppBundle: null 
  }),
}));