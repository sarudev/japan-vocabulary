import { Kana } from 'src/app/helpers/kana'

export interface Word {
  word: string
  translation: string
  kanji?: string
  particles?: Particle
}

export interface CurrentWord extends Word {
  kana: Kana[]
  romaji: string[]
}

export interface Particle {
  は?: number[]
  を?: number[]
}

export interface KanaConfig {
  replaceは: boolean
  replaceを: boolean
}
