import { create } from 'zustand';

interface AppState {
  activeEmotion: string;
  activeEmotionColor: string;
  setActiveEmotion: (emotion: string, color: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeEmotion: '',
  activeEmotionColor: '#00EEFF', // Default cyan
  setActiveEmotion: (emotion, color) => set({ activeEmotion: emotion, activeEmotionColor: color }),
}));
