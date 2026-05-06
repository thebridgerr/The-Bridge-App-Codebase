import React from 'react';
import { ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

export function GlassCard({ className = '', children, ...props }: ViewProps) {
  return (
    <BlurView
      intensity={30}
      tint="dark"
      className={`border-1 border-brutalist rounded-sm overflow-hidden bg-white/5 ${className}`}
      {...props}
    >
      {children}
    </BlurView>
  );
}
