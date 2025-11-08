"use client"

import { create } from "zustand"
import { generateMockSensors, generateMockReadings, type Sensor, type Reading } from "./mock"

interface AppState {
  sensors: Sensor[]
  readings: Reading[]
  updateReadings: () => void
  lastUpdate: number
}

export const useStore = create<AppState>((set) => ({
  sensors: generateMockSensors(5),
  readings: generateMockReadings(24),
  lastUpdate: Date.now(),
  updateReadings: () => {
    set({
      readings: generateMockReadings(24),
      lastUpdate: Date.now(),
    })
  },
}))
