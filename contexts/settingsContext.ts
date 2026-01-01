export type Mode = 'light' | 'dark' | 'system'

export interface ThemeStyles {
  light: Record<string, any>
  dark: Record<string, any>
}

export interface Theme {
  styles?: ThemeStyles
}

export interface Settings {
  mode: Mode
  theme: Theme
}