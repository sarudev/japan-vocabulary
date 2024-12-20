import { Word } from './interfaces'

export const words: Word[] = [
  { kanji: '始めましょう', kana: 'はじめましょう', translation: 'Vamos a empezar' },
  { kanji: '終わりましょう', kana: 'おわりましょう', translation: 'Vamos a terminar' },
  { kanji: '休みましょう', kana: 'やすみましょう', translation: 'Vamos a descansar' },
  { kanji: 'もう 一度', kana: 'もういちど', translation: 'De nuevo' },
  { kanji: '名前', kana: 'なまえ', translation: 'Nombre' },
  { kanji: '試験', kana: 'しけん', translation: 'Examen' },
  { kanji: '宿題', kana: 'しゅくだい', translation: 'Tarea' },
  { kanji: '質問', kana: 'しつもん', translation: 'Pregunta' },
  { kanji: '答え', kana: 'こたえ', translation: 'Respuesta' },
  { kanji: '例', kana: 'れい', translation: 'Ejemplo' },
  { kanji: '分かりますか', kana: 'わかりますか', translation: '¿Entendiste?' },
  { kanji: '分かります', kana: 'わかります', translation: 'Entiendo' },
  { kanji: '分かりません', kana: 'わかりません', translation: 'No entiendo.' },
  { kana: 'けっこうです', translation: 'Está bien' },
  { kanji: '駄目です', kana: 'だめです', translation: 'Está mal' },
  { kana: 'おはようございます', translation: 'Buenos Días' },
  { kana: 'こんにちは', translation: 'Hola', particles: { は: [4] } },
  { kana: 'こんばんは', translation: 'Buenas noches', particles: { は: [4] } },
  { kanji: 'お休みなさい', kana: 'おやすみなさい', translation: 'Buenas noches (dormir)' },
  { kana: 'さようなら', translation: 'Adiós' },
  { kana: 'ありがとうございます', translation: 'Muchas gracias' },
  { kana: 'すみません', translation: 'Disculpe' },
  { kanji: 'お願いします', kana: 'おねがいします', translation: 'Por favor' },
  { kanji: '零', kana: 'れい', translation: '0' },
  { kanji: '零', kana: 'ゼロ', translation: '0' },
  { kanji: '一', kana: 'いち', translation: '1' },
  { kanji: '二', kana: 'に', translation: '2' },
  { kanji: '三', kana: 'さん', translation: '3' },
  { kanji: '四', kana: 'よん', translation: '4' },
  { kanji: '午', kana: 'ご', translation: '5' },
  { kanji: '六', kana: 'ろく', translation: '6' },
  { kanji: '七', kana: 'なな', translation: '7' },
  { kanji: '八', kana: 'はち', translation: '8' },
  { kanji: '九', kana: 'きゅう', translation: '9' },
  { kanji: '十', kana: 'じゅう', translation: '10' },
  { kanji: '私', kana: 'わたし', translation: 'Yo' },
  { kanji: '私達', kana: 'わたしたち', translation: 'Nosotros' },
  { kanji: '貴方', kana: 'あなた', translation: 'Tu' },
  { kanji: 'あの人', kana: 'あのひと', translation: 'Aquella Persona' },
  { kanji: 'あの方', kana: 'あのかた', translation: 'Aquella Persona (formal)' },
  { kanji: '皆さん', kana: 'みなさん', translation: 'Todos' },
  { kana: '～さん', translation: 'Sr. | Sra. | Srta' },
  { kana: '～ちゃん', translation: 'Sufijo para niña' },
  { kana: '～くん', translation: 'Sufijo para niño' },
  { kanji: '～人', kana: '～じん', translation: 'Sufijo para indicar nacionalidad' },
  { kanji: '先生', kana: 'せんせい', translation: 'Profesor (tercera persona)' },
  { kanji: '教師', kana: 'きょうし', translation: 'Profesor (primera persona)' },
  { kanji: '学生', kana: 'がくせい', translation: 'Estudiante' },
  { kanji: '会社員', kana: 'かいしゃいん', translation: 'Empleado de una empresa' },
  { kanji: '～社員', kana: '～しゃいん', translation: 'Empleado de ～' },
  { kanji: '銀行員', kana: 'ぎんこういん', translation: 'Banquero' },
  { kanji: '医者', kana: 'いしゃ', translation: 'Medico' },
  { kanji: '研究者', kana: 'けんきゅうしゃ', translation: 'Investigador' },
  { kana: 'エンジニア', translation: 'Ingeniero' },
  { kanji: '大学', kana: 'だいがく', translation: 'Universidad' },
  { kanji: '病院', kana: 'びょういん', translation: 'Hospital' },
  { kanji: '電気', kana: 'でんき', translation: 'Electricidad' },
  { kanji: '誰', kana: 'だれ', translation: '¿Quién?' },
  { kanji: '何方', kana: 'どなた', translation: '¿Quién? (formal).' },
  { kanji: '～歳', kana: '～さい', translation: '～Años de edad.' },
  { kanji: '何歳', kana: 'なんさい', translation: 'Cuántos años' },
  { kanji: '御いくつ', kana: 'おいくつ', translation: 'Cuantos años (formal)' },
  { kana: 'はい', translation: 'Si' },
  { kana: 'いいえ', translation: 'No' },
  { kanji: '失礼ですが', kana: 'しつれいですが', translation: 'Perdóname, pero...' },
  { kanji: 'お名前は', kana: 'おなまえは', translation: '¿Cuál es tu nombre?', particles: { は: [4] } },
  { kanji: '初めまして', kana: 'はじめまして', translation: 'Mucho gusto' },
  { kana: 'どうぞ', translation: 'Encantado (de conocerlo)' },
  { kana: 'よろしく', translation: 'Saludo' },
  { kanji: '此方は～さんです', kana: 'こちらは～さんです', translation: 'Este es el Sr. / Sra. ～', particles: { は: [3] } },
  { kanji: '～から来ました', kana: '～からきました', translation: 'Vengo desde ～' }
]
