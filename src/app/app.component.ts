import { Component } from '@angular/core'
import { romanize, separate } from './helpers/kana'
import { EnterIconComponent } from './icons/enter-icon.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { numberEnterSlideDown, pressEnterLeaveSlide, submitEnterLeaveSlide, containerTranslationEnterSlideDown, numberEnterSlideUp, containerLeaveSlideDown, modalEnterLeaveSlide, containerEnterLeaveOpacity } from './helpers/animations'
import { CurrentWord, isWord, KanaConfig, Modal, Word } from './helpers/interfaces'
import { words } from './helpers/words'
import { UploadIconComponent } from './icons/upload-icon.component'
import { DownloadIconComponent } from './icons/download-icon.component'
import { EditIconComponent } from './icons/edit-icon.component'
import { CloseIconComponent } from './icons/close-icon.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    EnterIconComponent,
    ReactiveFormsModule,
    UploadIconComponent,
    DownloadIconComponent,
    EditIconComponent,
    CloseIconComponent
  ],
  animations: [
    numberEnterSlideUp,
    numberEnterSlideDown,
    pressEnterLeaveSlide,
    containerTranslationEnterSlideDown,
    containerLeaveSlideDown,
    submitEnterLeaveSlide,
    modalEnterLeaveSlide,
    containerEnterLeaveOpacity
  ]
})
export class アップコンポーネント {
  public counter = 0
  public formExpanded = false
  public isCorrect = false
  public newWord = true
  public isFirstTime = true
  public words: Word[] = words
  public modal: Modal = {
    show: false,
    closing: false,
    section: null
  }

  public digits: { current: number, showAnimation: boolean }[] = [{
    current: 0,
    showAnimation: false
  }]

  public current: CurrentWord = {
    kana: '',
    separatedKana: [],
    romaji: [],
    translation: '',
    kanji: undefined
  }

  private kanaConfig: KanaConfig = { replaceは: false, replaceを: false }

  public form = new FormGroup({
    kana: new FormControl('')
  })

  constructor () {
    this.form.controls.kana.valueChanges.subscribe(value => {
      this.validateCorrect(value!)
    })

    this.onSubmit(true)
  }

  onSubmit (preventNewWord = false) {
    if (!this.isCorrect && !preventNewWord) return

    this.form.reset()

    this.setCurrent()

    if (!preventNewWord) {
      this.increment()
      this.newWord = false
    }
  }

  private setCurrent () {
    // TODO better alhorithm
    let word: Word | null = null
    while (word == null && !this.words.every(w => w.kana.length === 0 || w.translation.length === 0)) {
      word = this.words[Math.floor(Math.random() * this.words.length)]
      if (word.kana.length === 0 || word.translation.length === 0) word = null
    }

    if (word != null) {
      this.current = {
        kana: word.kana,
        separatedKana: separate(word.kana),
        romaji: romanize(word.kana, word.particles, this.kanaConfig),
        translation: word.translation,
        kanji: word.kanji,
        particles: word.particles
      }
    }

    this.form.reset()
  }

  private validateCorrect (value: string) {
    this.isCorrect = value?.trim().replaceAll(' ', '') === romanize(this.current.kana, this.current.particles, this.kanaConfig).join('')
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
    if (this.isCorrect) return

    this.formExpanded = false
    this.isFirstTime = true
  }

  uploadFile () {
    void this.openModal('upload')
  }

  newFile () {
    void this.openModal('new-edit')
  }

  downloadFile () {
    void Swal.fire({
      title: 'Nombre del archivo',
      input: 'text',
      icon: 'question',
      inputPlaceholder: 'Nombre del archivo',
      showCancelButton: true,
      confirmButtonText: 'Descargar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const value = (document.getElementById('swal2-input') as HTMLInputElement).value
        console.log(value)
        if (value != null && value.length > 0) {
          // Handle return value
        } else
          Swal.showValidationMessage('Nombre de archivo no válido')
      }
    })
      .then(async data => {
        const filename = data.value

        if (data.isDismissed || filename == null || filename.length < 1) return

        const jsonString = JSON.stringify(this.words, null, 2)

        const blob = new Blob([jsonString], { type: 'application/json' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      })
  }

  closeModal (openEdit = false) {
    this.modal.closing = true

    setTimeout(() => {
      this.modal.show = false
      this.modal.closing = false

      if (openEdit)
        this.newFile()
    }, 250)
  }

  private async openModal (section: 'upload' | 'new-edit') {
    this.modal.show = true
    this.modal.section = section

    if (section !== 'upload')
      return

    await new Promise(resolve => setTimeout(resolve, 150))

    const uploadContainer = document.getElementById('upload-container') as HTMLDivElement
    const uploadInput = document.getElementById('upload-input') as HTMLInputElement
    const uploadMessage = document.getElementById('upload-message') as HTMLPreElement

    uploadContainer.addEventListener('dragover', (e) => {
      e.preventDefault()
      uploadContainer.classList.add('drag-over')
    })

    uploadContainer.addEventListener('dragleave', () => {
      uploadContainer.classList.remove('drag-over')
    })

    uploadContainer.addEventListener('drop', (e) => {
      e.preventDefault()
      uploadContainer.classList.remove('drag-over')

      const files = e.dataTransfer!.files
      if (files.length > 0 && files[0].type === 'application/json')
        this.handleFile(files[0], uploadMessage)
      else {
        uploadMessage.textContent = 'Por favor, carga solo archivos .json'
        uploadInput.value = ''
      }
    })

    uploadInput.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      const file = target.files![0]
      if (file.type === 'application/json')
        this.handleFile(file, uploadMessage)
      else {
        alert('Por favor, carga solo archivos .json')
        uploadMessage.textContent = 'Por favor, carga solo archivos .json'
        uploadInput.value = ''
      }
    })
  }

  private handleFile (file: File, uploadMessage: HTMLPreElement) {
    const reader = new FileReader()
    reader.onload = () => {
      uploadMessage.textContent = 'Archivo cargado exitosamente'
      this.parseFile(reader.result as string, uploadMessage)
    }
    reader.readAsText(file)
  }

  private parseFile (json: string, uploadMessage: HTMLPreElement) {
    uploadMessage.textContent = 'Analizando archivo...'

    let parsed: Word[] = []
    try {
      parsed = JSON.parse(json)
    } catch {
      uploadMessage.textContent = 'Error al analizar el archivo'
      return
    }

    if (!Array.isArray(parsed) || !parsed.every(w => isWord(w))) {
      uploadMessage.textContent = 'Archivo no válido'
      return
    }

    if (words.length > 0) {
      void Swal.fire({
        title: 'Ya existe un set de palabras',
        text: '¿Desea sobrescribirlo o combinarlo con el actual?',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Sobrescribir',
        cancelButtonText: 'Cancelar',
        denyButtonText: 'Combinar',
        denyButtonColor: '#6e7881',
        cancelButtonColor: '#dc3741'
      })
        .then(async data => {
          const overwrite = data.isConfirmed
          const combine = data.isDenied
          const canceled = data.isDismissed

          if (canceled) return

          if (overwrite)
            this.words = words

          if (combine)
            this.words = this.words.concat(words)

          this.setCurrent()
          this.closeModal(true)
        })
    }
  }

  onInputChange (index: number, property: keyof Word, target: EventTarget) {
    const value = (target as HTMLInputElement).value
    this.words[index] = { ...this.words[index], [property]: value }
    console.log(this.words)
    this.words = this.words.filter((w, i) => w.kana.length > 0 || w.translation.length > 0 || i === this.words.length - 1)
    this.setCurrent()
  }

  addNewWord () {
    this.words.push({ kanji: '', kana: '', translation: '' })
  }

  removeWord (index: number) {
    this.words.splice(index, 1)
    this.setCurrent()
  }

  get canAddNewWord () {
    const word = this.words.at(-1)
    if (word == null) return true
    return word.kana.length > 0 && word.translation.length > 0
  }
}
