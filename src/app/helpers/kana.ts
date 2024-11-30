import { KanaConfig, Particle } from './interfaces'

/* eslint-disable object-property-newline */
export type Kana = keyof typeof kana

export function separate (word: string): Kana[] {
  return Array.from(word.matchAll(/([っッ]?[ぁ-んァ-ヴ～](?:ゃ|ゅ|ょ|ぃ|ぇ|ぉ|ャ|ュ|ョ|ァ|ィ|ェ|ォ)?)(ー)?/g), match => match[0] as Kana)
}

export function romanize (word: string, particles: Particle | undefined, config: KanaConfig): string[] {
  const separated = separate(word)

  const result = separated.map((character, i) => {
    if (character == null) return ''

    const core = character.replace(/^[っッ]|ー$/g, '') as Kana
    let base = kana[core]

    if (config.replaceは && particles?.は?.includes(i) === true)
      base = 'wa'
    if (config.replaceを && particles?.を?.includes(i) === true)
      base = 'wo'

    const first = character.startsWith('ッ') || character.startsWith('っ') ? base[0] : ''
    const last = character.endsWith('ー') ? base[base.length - 1] : ''

    return first + base + last
  })
  return result
}

export const kana = {
  // HIRAGANA
  // a
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  // k
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  // g
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  // s
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  // z
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  // t
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  // d
  だ: 'da', ぢ: 'ji', づ: 'ju', で: 'de', ど: 'do',
  // n
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  // h
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  // b
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  // p
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  // m
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  // y
  や: 'ya', ゆ: 'yu', よ: 'yo',
  // ky
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  // gy
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  // sy
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  // jy
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  // ch
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  // by
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  // py
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
  // my
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  // ry
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  // r
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  // w
  わ: 'wa', ゑ: 'we', を: 'wo',
  // n
  ん: 'n',

  // KATAKANA
  // a
  ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
  // k
  カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
  // g
  ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
  // s
  サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
  // z
  ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
  // t
  タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
  トィ: 'ti', トゥ: 'tu', トョ: 'to',
  // d
  ダ: 'da', ヂ: 'ji', ヅ: 'ju', デ: 'de', ド: 'do',
  ディ: 'di', デュ: 'du', デョ: 'do',
  // n
  ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
  // h
  ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
  // f
  ファ: 'fa', フィ: 'fi', フェ: 'fe', フォ: 'fo',
  // b
  バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
  // p
  パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
  // m
  マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
  // y
  ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
  // ky
  キャ: 'kya', キュ: 'kyu', キョ: 'kyo',
  // gy
  ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo',
  // sh
  シャ: 'sha', シュ: 'shu', ショ: 'sho',
  // ch
  チャ: 'cha', チュ: 'chu', チョ: 'cho',
  // j
  ジャ: 'ja', ジュ: 'ju', ジョ: 'jo',
  // by
  ビャ: 'bya', ビュ: 'byu', ビョ: 'byo',
  // py
  ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo',
  // my
  ミャ: 'mya', ミュ: 'myu', ミョ: 'myo',
  // ry
  リャ: 'rya', リュ: 'ryu', リョ: 'ryo',
  // r
  ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
  // w
  ワ: 'wa', ヲ: 'wo',
  // n
  ン: 'n',
  '～': '~'
} as const
