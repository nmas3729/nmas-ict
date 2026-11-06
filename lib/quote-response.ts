export const quoteAcceptedMessage = 'Your quote request has been accepted for delivery.'

export type QuoteResponseResult =
  | { kind: 'accepted' }
  | { kind: 'error'; message: string }
  | { kind: 'invalid-response' }

const fallbackErrorMessage = 'We could not submit your request. Please try again or contact NMAS directly.'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export async function readQuoteResponse(response: Response): Promise<QuoteResponseResult> {
  let result: unknown
  try {
    result = await response.json()
  } catch {
    return { kind: 'invalid-response' }
  }

  if (!isRecord(result)) return { kind: 'invalid-response' }

  if (!response.ok) {
    return {
      kind: 'error',
      message: typeof result.error === 'string' && result.error
        ? result.error
        : fallbackErrorMessage,
    }
  }

  return result.message === quoteAcceptedMessage
    ? { kind: 'accepted' }
    : { kind: 'invalid-response' }
}
