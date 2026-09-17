import { create } from 'zustand';

type ExperienceState = {
  /** Global scroll progress, 0 → 1 across the whole page. */
  progress: number;
  /** Instantaneous scroll velocity (used for motion-reactive FX). */
  velocity: number;

  setScroll: (progress: number, velocity: number) => void;
};

export const useExperience = create<ExperienceState>((set) => ({
  progress: 0,
  velocity: 0,
  setScroll: (progress, velocity) => set({ progress, velocity }),
}));
