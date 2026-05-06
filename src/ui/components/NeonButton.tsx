import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { MotiView } from 'moti';
import { TerminalText } from './TerminalText';

interface NeonButtonProps extends PressableProps {
  label: string;
  emotionColor: string; // Tailwind hex color for the glow
}

export function NeonButton({ label, emotionColor, className = '', ...props }: NeonButtonProps) {
  return (
    <Pressable {...props}>
      {({ pressed }) => (
        <MotiView
          animate={{
            scale: pressed ? 0.95 : 1,
            shadowOpacity: pressed ? 0.8 : 0.4,
            shadowRadius: pressed ? 15 : 10,
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
          style={{
            shadowColor: emotionColor,
            shadowOffset: { width: 0, height: 0 },
            backgroundColor: 'transparent',
            borderColor: emotionColor,
            borderWidth: 1,
            borderRadius: 2,
          }}
          className={`px-6 py-4 items-center justify-center ${className}`}
        >
          <TerminalText style={{ color: emotionColor }} className="text-lg font-bold">
            {label}
          </TerminalText>
        </MotiView>
      )}
    </Pressable>
  );
}
