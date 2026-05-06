import React from 'react';
import { Text, TextProps } from 'react-native';

export function TerminalText({ className = '', style, children, ...props }: TextProps) {
  return (
    <Text
      className={`font-mono text-white tracking-widest ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}
