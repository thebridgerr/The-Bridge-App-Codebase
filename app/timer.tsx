import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import Svg, { Circle } from 'react-native-svg';

// Custom Components & State
import { TerminalText } from '../src/ui/components/TerminalText';
import { useAppStore } from '../src/core/store/useAppStore';

export default function TimerScreen() {
  const router = useRouter();
  
  const { 
    activeEmotion, 
    activeEmotionColor, 
    currentAnchorTask, 
    selectRandomTask 
  } = useAppStore();

  // Local State: -1 acts as our "fetching" guard
  const [isReady, setIsReady] = useState(false);
  const[timeLeft, setTimeLeft] = useState(-1);
  const [totalDuration, setTotalDuration] = useState(60); // Fallback baseline

  // --- 1. INITIALIZATION: FETCH DYNAMIC TASK ---
  useEffect(() => {
    const fetchDirective = async () => {
      const targetEmotion = activeEmotion || 'Boredom';
      await selectRandomTask(targetEmotion);
    };
    
    fetchDirective();
  },[]); // Run strictly once on mount

  // --- 2. SYNC STATE WITH DATABASE TASK ---
  useEffect(() => {
    if (currentAnchorTask) {
      // Failsafe: Default to 60 seconds if database value is null, missing, or 0
      const duration = currentAnchorTask.durationSeconds || 60;
      
      setTimeLeft(duration);
      setTotalDuration(duration);
      setIsReady(true);
    }
  }, [currentAnchorTask]);

  // --- 3. COUNTDOWN & AUTO-NAVIGATION ENGINE ---
  useEffect(() => {
    if (!isReady || timeLeft === -1) return;

    if (timeLeft <= 0) {
      // Countdown complete. Destroy timer screen stack and route to Decision.
      router.replace('/decision');
      return;
    }
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft, isReady, router]);

  // --- 4. SVG RING CALCULATIONS ---
  const radius = 100;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  // Depletes smoothly mapped perfectly to the dynamic totalDuration state
  const strokeDashoffset = circumference - (timeLeft / totalDuration) * circumference;

  // --- FALLBACK / LOADING UI ---
  if (!isReady || timeLeft === -1) {
    return (
      <View className="flex-1 bg-[#0A0A0A] justify-center items-center px-6">
        <MotiView
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, type: 'timing', duration: 800 }}
        >
          <TerminalText className="text-[#333333] text-xl tracking-[0.3em] text-center">
            [SYSTEM] EXTRACTING PROTOCOL...
          </TerminalText>
        </MotiView>
      </View>
    );
  }

  // --- MAIN RENDER ---
  return (
    <View className="flex-1 bg-[#0A0A0A] justify-center items-center px-6">
      {/* Brutalist enforcement: User cannot swipe back to escape the task */}
      <Stack.Screen options={{ gestureEnabled: false, headerShown: false }} />
      
      {/* UI FEEDBACK: THE COMMITMENT NOTIFICATION */}
      <MotiView
        from={{ opacity: 0, translateY: -15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 200 }}
        className="absolute top-24 w-full items-center"
      >
        <TerminalText className="text-[#E0E0E0] text-sm tracking-[0.2em] font-bold border-b border-[#333333] pb-2">
          [ COMMITMENT REQUIRED: {totalDuration}s ]
        </TerminalText>
      </MotiView>

      {/* CLOCK / SVG RING BLOCK */}
      <MotiView 
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 800, delay: 400 }}
        className="relative justify-center items-center mb-16 mt-12"
      >
        <Svg width={250} height={250}>
          {/* Background Track */}
          <Circle
            cx="125"
            cy="125"
            r={radius}
            stroke="#1A1A1A"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Dynamic Progress Track */}
          <Circle
            cx="125"
            cy="125"
            r={radius}
            stroke={activeEmotionColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 125 125)"
          />
        </Svg>
        {/* Centered Digital Timer */}
        <View className="absolute">
          <TerminalText className="text-6xl font-bold tracking-tighter" style={{ color: activeEmotionColor }}>
            {timeLeft}
          </TerminalText>
        </View>
      </MotiView>

      {/* DYNAMIC DIRECTIVE TEXT */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 700 }}
        className="px-4 w-full"
      >
        <TerminalText className="text-2xl text-center text-white/90 leading-10 font-bold tracking-[0.15em] uppercase">
          {currentAnchorTask?.taskDirective}
        </TerminalText>
      </MotiView>
    </View>
  );
}