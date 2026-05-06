import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { TerminalText } from '../src/ui/components/TerminalText';
import { NeonButton } from '../src/ui/components/NeonButton';
import { useAppStore } from '../src/core/store/useAppStore';

export default function InterceptorScreen() {
  const router = useRouter();
  const setActiveEmotion = useAppStore((state) => state.setActiveEmotion);

  const emotions = [
    { label: 'Boredom', color: '#00EEFF' },
    { label: 'Anxiety', color: '#8A2BE2' },
    { label: 'Uncertainty', color: '#FF8C00' },
    { label: 'Fatigue', color: '#8FBC8F' },
  ];

  const handleEmotionSelect = (label: string, color: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setActiveEmotion(label, color);
    router.push('/timer');
  };

  return (
    <View className="flex-1 bg-obsidian justify-center items-center px-6">
      <TerminalText className="text-3xl text-center mb-12 text-white">
        WHAT ARE YOU AVOIDING?
      </TerminalText>
      
      <View className="w-full space-y-6">
        {emotions.map((em) => (
          <NeonButton
            key={em.label}
            label={em.label.toUpperCase()}
            emotionColor={em.color}
            onPress={() => handleEmotionSelect(em.label, em.color)}
            className="w-full mb-4"
          />
        ))}
      </View>
    </View>
  );
}
