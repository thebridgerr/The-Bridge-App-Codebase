import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';

// Core State
import { useAppStore } from '@/core/store/useAppStore';

// UI Components
import {TerminalText} from '@/ui/components/TerminalText';
import {GlassCard} from '@/ui/components/GlassCard';
import {NeonButton} from '@/ui/components/NeonButton';

// Emotion token mapping mapped strictly to tailwind.config.js laws
const EMOTION_TOKENS: Record<string, string> = {
  Boredom: '#00EEFF',     // Intercept Cyan
  Anxiety: '#8A2BE2',     // Pulse Violet
  Uncertainty: '#FF8C00', // Safety Orange
  Fatigue: '#8FBC8F',     // Muted Moss
  Fallback: '#FFFFFF',    // Failsafe White
};

export default function Dashboard() {
  const router = useRouter();
  
  // Zustand State Consumption
  const { activeEmotion, setActiveEmotion } = useAppStore();

  // Failsafe state extraction
  const emotion = activeEmotion || 'UNKNOWN';
  const accentColor = EMOTION_TOKENS[emotion as keyof typeof EMOTION_TOKENS] || EMOTION_TOKENS.Fallback;

  // Action Handler
  const handleDisconnect = () => {
    setActiveEmotion('', '');
    // Replace prevents the user from swiping back to the dashboard.
    // The session is dead. Return to base state.
    router.replace('/'); 
  };

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
      <View className="flex-1 justify-center mb-8">
        <GlassCard className="p-6 border border-[#333333] rounded-none">
          {/* 
            TODO (BACKEND INJECTION): 
            Replace this hardcoded string with dynamic context derived from local-first 
            `BridgeLogs` table combined with local AI rule grounding.
            Query schema: SELECT grounding_quote FROM BridgeLogs WHERE emotionState = ?
          */}
          <TerminalText className="text-white text-center text-sm leading-7 tracking-wide">
            "The algorithm demands your time. You chose to keep it."
          </TerminalText>
        </GlassCard>
      </View>

      {/* --- ACTION SECTION --- */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 600, delay: 800 }}
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