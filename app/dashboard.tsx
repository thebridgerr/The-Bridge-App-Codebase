import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import { Stack } from 'expo-router';
import { TerminalText } from '../src/ui/components/TerminalText';
import { GlassCard } from '../src/ui/components/GlassCard';

export default function DashboardScreen() {
  const { width } = Dimensions.get('window');
  const height = 300;

  // Generative constellation algorithm
  const stars = useMemo(() => {
    const points = [];
    for (let i = 0; i < 12; i++) {
      points.push({
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        r: Math.random() * 2 + 1,
      });
    }
    return points;
  }, [width]);

  return (
    <View className="flex-1 bg-obsidian pt-20 px-6">
      <Stack.Screen options={{ headerShown: false }} />
      
      <TerminalText className="text-cyan-intercept text-3xl mb-8">
        ASTRO-GRAPH
      </TerminalText>

      <GlassCard className="w-full p-4 mb-8">
        <TerminalText className="text-white mb-4 text-sm">
          Total Bridges: {stars.length}
        </TerminalText>
        <View className="w-full rounded-sm overflow-hidden border border-brutalist bg-black/50" style={{ height }}>
          <Svg width="100%" height="100%">
            {/* Draw Constellation Lines */}
            <G opacity={0.3}>
              {stars.map((star, i) => {
                if (i === 0) return null;
                const prev = stars[i - 1];
                return (
                  <Line
                    key={`line-${i}`}
                    x1={prev.x}
                    y1={prev.y}
                    x2={star.x}
                    y2={star.y}
                    stroke="#00EEFF"
                    strokeWidth="1"
                  />
                );
              })}
            </G>
            {/* Draw Stars */}
            {stars.map((star, i) => (
              <Circle
                key={`star-${i}`}
                cx={star.x}
                cy={star.y}
                r={star.r + 1}
                fill="#00EEFF"
                opacity={0.8}
              />
            ))}
          </Svg>
        </View>
      </GlassCard>

      <TerminalText className="text-white/50 text-xs text-center">
        Every star represents a moment you chose reality over the algorithm.
      </TerminalText>
    </View>
  );
}
