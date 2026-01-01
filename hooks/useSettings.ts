import { useState, useCallback } from 'react'
import type { Mode, Settings } from '@/contexts/settingsContext'

const defaultSettings: Settings = {
  mode: 'light',
  theme: {
    styles: {
      light: {},
      dark: {}
    }
  }
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    // Prova a recuperare le impostazioni salvate
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-settings')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          return defaultSettings
        }
      }
    }
    return defaultSettings
  })

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings)
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-settings', JSON.stringify(newSettings))
    }
  }, [])

  return {
    settings,
    updateSettings
  }
}