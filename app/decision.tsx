import React from 'react';
import { View, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { TerminalText } from '../src/ui/components/TerminalText';
import { NeonButton } from '../src/ui/components/NeonButton';

export default function DecisionScreen() {
  const router = useRouter();

  const handleBridge = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/dashboard');
  };

  const handleScroll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    router.push('/');
  };

  return (
    <View className="flex-1 bg-obsidian justify-center items-center px-6">
      <Stack.Screen options={{ gestureEnabled: false, headerShown: false }} />

      <TerminalText className="text-2xl text-center mb-16 text-white">
        INTERCEPT COMPLETE
      </TerminalText>

      <View className="w-full space-y-8">
        <NeonButton
          label="BRIDGE TO REALITY"
          emotionColor="#00EEFF"
          onPress={handleBridge}
          className="w-full mb-8 py-6"
        />

        <Pressable onPress={handleScroll} className="w-full py-4 items-center border-t border-brutalist mt-8 pt-8">
          <TerminalText className="text-white/30 text-sm">
            Continue Scrolling
          </TerminalText>
        </Pressable>
      </View>
    </View>
  );
}
