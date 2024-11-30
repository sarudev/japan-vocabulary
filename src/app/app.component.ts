import { Component } from '@angular/core'
import { romanize, separate } from './helpers/kana'
import { EnterIconComponent } from './icons/enter-icon.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { numberEnterSlideDown, pressEnterLeaveSlide, submitEnterLeaveSlide, containerTranslationEnterSlideDown, numberEnterSlideUp, containerLeaveSlideDown } from './helpers/animations'
import { CurrentWord, KanaConfig } from './helpers/interfaces'
import { words } from './helpers/words'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [EnterIconComponent, ReactiveFormsModule],
  animations: [numberEnterSlideUp, numberEnterSlideDown, pressEnterLeaveSlide, containerTranslationEnterSlideDown, containerLeaveSlideDown, submitEnterLeaveSlide]
})
export class アップコンポーネント {
  public counter = 0
  public formExpanded = false
  public correct = false
  public newWord = true
  public isFirstTime = true
  public digits: { current: number, showAnimation: boolean }[] = [{
    current: 0,
    showAnimation: false
  }]

  public current: CurrentWord = {
    word: '',
    kana: [],
    romaji: [],
    translation: '',
    kanji: undefined
  }

  private kanaConfig: KanaConfig = { replaceは: true, replaceを: false }

  public form = new FormGroup({
    kana: new FormControl('')
  })

  constructor () {
    this.form.controls.kana.valueChanges.subscribe(value => {
      const correctValue = romanize(this.current.word, this.current.particles, this.kanaConfig).join('')
      this.correct = value?.trim() === correctValue
    })

    this.onSubmit(true)
  }

  onSubmit (preventNewWord = false) {
    if (!this.correct && !preventNewWord) return

    this.form.reset()

    // TODO better alhorithm
    const current = words[Math.floor(Math.random() * words.length)]
    this.current = {
      word: current.word,
      kana: separate(current.word),
      romaji: romanize(current.word, current.particles, this.kanaConfig),
      translation: current.translation,
      kanji: current.kanji,
      particles: current.particles
    }

    if (!preventNewWord) {
      this.increment()
      this.newWord = false
    }
  }

  increment () {
    this.counter++
    const reversedDigits = this.splitIntoDigits(this.counter).reverse()
    this.digits = reversedDigits.map((digit, i) => ({
      current: digit,
      showAnimation: i === 0 || reversedDigits[i - 1] === 0
    })).reverse()
  }

  onFirstTimeAnimationDone () {
    this.isFirstTime = false
  }

  onNextAnimationDone () {
    this.digits.forEach(d => d.showAnimation = false)
  }

  splitIntoDigits (number: number): number[] {
    return Array.from(String(number), (digit) => Number(digit))
  }

  onFocusOut () {
    this.formExpanded = false
    this.isFirstTime = true
  }
}
