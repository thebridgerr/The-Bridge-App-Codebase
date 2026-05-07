import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';

// Core & Data Layer
import { useAppStore } from '@/core/store/useAppStore';
import { dbManager } from '@/core/database/DatabaseManager';

// UI Components
import {TerminalText} from '@/ui/components/TerminalText';
import {GlassCard} from '@/ui/components/GlassCard';
import {NeonButton} from '@/ui/components/NeonButton';

export default function Dashboard() {
  const router = useRouter();
  
  // State Extraction
  const { activeEmotion, activeEmotionColor, resetSession } = useAppStore();

  // Local State
  const [affirmation, setAffirmation] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  // Failsafe mappings
  const emotion = activeEmotion || 'Boredom';
  const accentColor = activeEmotionColor || '#FFFFFF';

  // --- FETCH DYNAMIC AFFIRMATION ---
  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const query = 'SELECT content FROM Affirmations WHERE category = ?';
        const results = await dbManager.executeSql(query, [emotion]);

        if (results && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setAffirmation(results[randomIndex].content);
        } else {
          // Fallback if DB fetch fails
          setAffirmation('The algorithm demands your time. You chose to keep it.');
        }
      } catch (error) {
        console.error('[DB_ERR] Failed to fetch affirmation:', error);
        setAffirmation('Connection severed. Reality engaged.');
      } finally {
        setIsReady(true);
      }
    };

    fetchAffirmation();
  }, [emotion]);

  // --- ACTION HANDLER ---
  const handleDisconnect = () => {
    resetSession();
    // Destroy stack to prevent backward swipe into old session
    router.replace('/'); 
  };

  // --- LOADING GUARD ---
  if (!isReady) {
    return <View className="flex-1 bg-[#0A0A0A]" />;
  }

  // --- MAIN RENDER ---
  return (
    <View className="flex-1 bg-[#0A0A0A] px-6 py-12 justify-between">
      
      {/* --- TOP SECTION: THE VALIDATION --- */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 200 }}
        className="mt-8 border-b border-[#333333] pb-4"
      >
        <TerminalText 
          style={{ color: accentColor }} 
          className="text-xl uppercase font-bold tracking-[0.2em]"
        >
          [{emotion}] RECOGNIZED.
        </TerminalText>
        <TerminalText className="text-[#E0E0E0] text-lg mt-2 tracking-wider">
          AGENCY RECLAIMED.
        </TerminalText>
      </MotiView>

      {/* --- MIDDLE SECTION: THE TIME VAULT --- */}
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 1000, delay: 400 }}
        className="items-center justify-center my-12"
      >
        <TerminalText 
          className="text-5xl text-center font-bold text-white tracking-tighter" 
          style={{ lineHeight: 56 }}
        >
          25 MINUTES
        </TerminalText>
        <TerminalText 
          style={{ color: accentColor }} 
          className="text-2xl text-center font-bold tracking-[0.2em] mt-2"
        >
          RECLAIMED
        </TerminalText>
      </MotiView>

      {/* --- LOWER SECTION: THE MIRROR CARD --- */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 600 }}
        className="flex-1 justify-center mb-8"
      >
        <GlassCard className="p-6 border border-[#333333] rounded-none">
          <TerminalText className="text-white text-center text-sm leading-8 tracking-wider uppercase font-bold">
            "{affirmation}"
          </TerminalText>
        </GlassCard>
      </MotiView>

      {/* --- ACTION SECTION --- */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 600, delay: 900 }}
      >
        <NeonButton
          label="DISCONNECT"
          onPress={handleDisconnect}
          emotionColor={accentColor}
          className="mb-8 rounded-none border border-[#333333]"
        />
      </MotiView>
      
    </View>
  );
}