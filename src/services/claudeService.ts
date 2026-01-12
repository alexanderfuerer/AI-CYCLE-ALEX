import type { Employee, StyleProfile, ClaudeAnalysisResponse } from '../types'

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

// ============================================
// STYLE ANALYSIS
// ============================================

const STYLE_ANALYSIS_SYSTEM_PROMPT = `Du bist ein hochspezialisierter Textanalyst nach dem PPP-System (Prime, Prompt, Polish) mit Mustererkennung.

# AUFGABE
Analysiere die folgenden Mustertexte und erstelle ein detailliertes Stilprofil.

# MUSTERERKENNUNGSSYSTEM

## 1. QUANTITATIVE ANALYSE

**Basis-Metriken:**
- Anzahl der Wörter pro Beitrag
- Anzahl der Wörter pro Satz
- Anzahl der Sätze pro Absatz
- Anzahl der Zeilen pro Absatz
- Anzahl der Emojis pro Beitrag
- Verhältnis von Emojis zu Text
- Am häufigsten verwendete Emojis (Top 5)
- Am häufigsten verwendete Wörter (Top 10, ohne "und", "der", "die", "das", "ist", "in", "zu")
- Anzahl der Zeilenumbrüche pro Beitrag
- Anzahl der Absatzumbrüche pro Beitrag

**Satzlängen-Verteilung (in Prozent):**
- Sätze mit weniger als 3 Wörtern
- Sätze mit 4–8 Wörtern
- Sätze mit 9–15 Wörtern
- Sätze mit 16–25 Wörtern
- Sätze mit 26+ Wörtern

## 2. QUALITATIVE ANALYSE
- Tonalität im Detail (z.B. motivierend, sachlich, informell, provokativ)
- Rhythmus, Satzbau und Struktur der Absätze
- Art der Sprache/Botschaftsvermittlung (direkt, rhetorisch, erklärend, storytelling)
- Überzeugungen/Beliefs, die vermittelt werden

# OUTPUT FORMAT
Antworte AUSSCHLIESSLICH im folgenden JSON-Format ohne zusätzlichen Text:

{
  "quantitative": {
    "avgWordsPerPost": number,
    "avgWordsPerSentence": number,
    "avgSentencesPerParagraph": number,
    "avgLinesPerParagraph": number,
    "avgEmojisPerPost": number,
    "emojiToTextRatio": number,
    "topEmojis": ["emoji1", "emoji2"],
    "topWords": ["wort1", "wort2"],
    "avgLineBreaksPerPost": number,
    "avgParagraphBreaksPerPost": number,
    "sentenceLengthDistribution": {
      "under3Words": number,
      "words4to8": number,
      "words9to15": number,
      "words16to25": number,
      "over25Words": number
    }
  },
  "qualitative": {
    "tonality": "string",
    "rhythm": "string",
    "communicationStyle": "string",
    "beliefs": "string"
  }
}`

export async function analyzeStyle(sampleTexts: string): Promise<ClaudeAnalysisResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: STYLE_ANALYSIS_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `# MUSTERTEXTE:\n\n${sampleTexts}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to analyze style')
  }

  const data = await response.json()
  const content = data.content[0].text

  // Parse JSON from response
  try {
    return JSON.parse(content) as ClaudeAnalysisResponse
  } catch {
    throw new Error('Failed to parse style analysis response')
  }
}

// ============================================
// POST GENERATION
// ============================================

function buildGenerationPrompt(
  employee: Employee,
  styleProfile: StyleProfile
): string {
  const { quantitative, qualitative } = styleProfile

  return `Du bist ein hochspezialisierter LinkedIn-Ghostwriter für ${employee.name}.
Du imitierst den Schreibstil präzise basierend auf dem analysierten PPP-Stilprofil.

# ALLGEMEINE TONALITÄT
${employee.toneDescription}

# ANALYSIERTES STILPROFIL

## Quantitative Vorgaben (STRIKT EINHALTEN)
- Ziel-Wortanzahl: ${quantitative.avgWordsPerPost} Wörter (±10%)
- Wörter pro Satz: ~${quantitative.avgWordsPerSentence}
- Sätze pro Absatz: ~${quantitative.avgSentencesPerParagraph}
- Emojis pro Post: ~${quantitative.avgEmojisPerPost}
- Zeilenumbrüche: ~${quantitative.avgLineBreaksPerPost}
- Absatzumbrüche: ~${quantitative.avgParagraphBreaksPerPost}

## Satzlängen-Verteilung (WICHTIG - EXAKT EINHALTEN)
- ${quantitative.sentenceLengthDistribution.under3Words}% sehr kurze Sätze (1-3 Wörter)
- ${quantitative.sentenceLengthDistribution.words4to8}% kurze Sätze (4-8 Wörter)
- ${quantitative.sentenceLengthDistribution.words9to15}% mittlere Sätze (9-15 Wörter)
- ${quantitative.sentenceLengthDistribution.words16to25}% längere Sätze (16-25 Wörter)
- ${quantitative.sentenceLengthDistribution.over25Words}% lange Sätze (26+ Wörter)

## Bevorzugte Elemente (VERWENDEN)
- Diese Emojis nutzen: ${quantitative.topEmojis.join(', ')}
- Diese Wörter/Phrasen einbauen: ${quantitative.topWords.join(', ')}

## Qualitative Vorgaben (STIL IMITIEREN)
- Tonalität: ${qualitative.tonality}
- Rhythmus & Struktur: ${qualitative.rhythm}
- Kommunikationsstil: ${qualitative.communicationStyle}
- Beliefs/Werte transportieren: ${qualitative.beliefs}

# REGELN
1. Halte dich EXAKT an die Satzlängen-Verteilung
2. Verwende die typischen Wörter und Emojis natürlich im Text
3. Imitiere den Rhythmus und die Struktur präzise
4. Schreibe IMMER in Schweizer Rechtschreibung (ss statt ß, z.B. "grossartig" nicht "großartig")
5. Der Post muss authentisch nach ${employee.name} klingen
6. Kein Post sollte gleich beginnen wie ein anderer
7. Gib NUR den LinkedIn-Post zurück, ohne zusätzliche Erklärungen oder Kommentare`
}

export async function generatePost(
  inputContent: string,
  employee: Employee,
  styleProfile: StyleProfile
): Promise<string> {
  const systemPrompt = buildGenerationPrompt(employee, styleProfile)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Erstelle aus folgendem Inhalt einen LinkedIn-Post im Stil von ${employee.name}:\n\n${inputContent}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to generate post')
  }

  const data = await response.json()
  return data.content[0].text
}
