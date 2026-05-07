import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import Svg, { Circle } from 'react-native-svg';
import { TerminalText } from '../src/ui/components/TerminalText';
import { useAppStore } from '../src/core/store/useAppStore';

export default function TimerScreen() {
  const router = useRouter();
  const { activeEmotion, activeEmotionColor } = useAppStore();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/decision');
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, router]);

  const radius = 100;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 5) * circumference;

  return (
    <View className="flex-1 bg-obsidian justify-center items-center">
      <Stack.Screen options={{ gestureEnabled: false, headerShown: false }} />
      
      <View className="relative justify-center items-center mb-12">
        <Svg width={250} height={250}>
          <Circle
            cx="125"
            cy="125"
            r={radius}
            stroke="#333333"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
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
        <View className="absolute">
          <TerminalText className="text-4xl" style={{ color: activeEmotionColor }}>
            {timeLeft}
          </TerminalText>
        </View>
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 500 }}
        className="px-8"
      >
        <TerminalText className="text-xl text-center text-white/80">
          Drop the phone. Take 10 deep breaths. Observe the {activeEmotion.toLowerCase()}.
        </TerminalText>
      </MotiView>
    </View>
  );
}
