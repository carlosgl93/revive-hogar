import { Email, ParseResult, normalizeMonto, normalizeRut } from './types';

const MINIMAX_API_URL = 'https://api.minimaxi.com/v1/text/chatcompletion_v2';
const TIMEOUT_MS = 10_000;

const SYSTEM_PROMPT = `Sos un parser de emails bancarios chilenos. Devolvé SOLO JSON válido con la forma: {"esTransferencia": boolean, "monto": number|null, "rut": string|null, "fecha": string|null (formato ISO YYYY-MM-DD), "comentario": string|null, "nombre": string|null}. Si el email NO es una transferencia bancaria, devolvé esTransferencia=false y el resto null.`;

interface LlmResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface LlmParsedJson {
  esTransferencia: boolean;
  monto: number | null;
  rut: string | null;
  fecha: string | null;
  comentario: string | null;
  nombre: string | null;
}

export async function parseLlm(email: Email, apiKey: string): Promise<ParseResult | null> {
  if (!apiKey) {
    console.error('[parseLlm] No API key provided');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-M3',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: email.bodyPlain },
        ],
        response_format: { type: 'json_object' },
        temperature: 0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[parseLlm] HTTP ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = (await response.json()) as LlmResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('[parseLlm] No content in LLM response');
      return null;
    }

    let parsed: LlmParsedJson;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error('[parseLlm] Invalid JSON from LLM:', content);
      return null;
    }

    if (!parsed.esTransferencia) return null;
    if (!parsed.monto || parsed.monto <= 0) return null;

    return {
      monto: normalizeMonto(String(parsed.monto)),
      rut: parsed.rut ? normalizeRut(parsed.rut) : null,
      fecha: parsed.fecha || null,
      comentario: parsed.comentario || null,
      nombre: parsed.nombre || null,
      source: 'llm',
      rawExcerpt: email.bodyPlain.slice(0, 500),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[parseLlm] Request timed out after', TIMEOUT_MS, 'ms');
    } else {
      console.error('[parseLlm] Error:', err);
    }
    return null;
  }
}