import { Kana } from 'src/app/helpers/kana'

export interface Word {
  kana: string
  translation: string
  kanji?: string
  particles?: Particle
}

export interface CurrentWord extends Word {
  separatedKana: Kana[]
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

export interface Modal {
  show: boolean
  closing: boolean
  section: 'upload' | 'new-edit' | null
}

export const isWord = (word: unknown): word is Word => (
  typeof word === 'object' && word != null &&
  'kana' in word && typeof word.kana === 'string' &&
  'translation' in word && typeof word.translation === 'string' &&
  (!('kanji' in word) || typeof word.kanji === 'string') &&
  (!('particles' in word) || word.particles == null || isParticle(word.particles))
)

export const isParticle = (particle: unknown): particle is Particle => (
  typeof particle === 'object' && particle != null &&
  (!('は' in particle) || particle.は == null || (Array.isArray(particle.は) && particle.は.every(k => typeof k === 'number'))) &&
  (!('を' in particle) || particle.を == null || (Array.isArray(particle.を) && particle.を.every(k => typeof k === 'number')))
)
