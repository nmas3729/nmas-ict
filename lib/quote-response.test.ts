import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readQuoteResponse } from './quote-response.ts'

test('preserves API verification and delivery errors for the form', async () => {
  const verification = await readQuoteResponse(Response.json(
    { error: 'This quote request could not be verified.' },
    { status: 403 },
  ))
  const delivery = await readQuoteResponse(Response.json(
    { error: 'We could not send your quote request right now.' },
    { status: 502 },
  ))

  assert.deepEqual(verification, { kind: 'error', message: 'This quote request could not be verified.' })
  assert.deepEqual(delivery, { kind: 'error', message: 'We could not send your quote request right now.' })
})

test('treats non-JSON and non-accepted success responses as invalid responses', async () => {
  const nonJson = await readQuoteResponse(new Response('<html>proxy error</html>', { status: 502 }))
  const emptySuccess = await readQuoteResponse(new Response(null, { status: 200 }))

  assert.deepEqual(nonJson, { kind: 'invalid-response' })
  assert.deepEqual(emptySuccess, { kind: 'invalid-response' })
})

test('accepts only the API response that confirms delivery processing', async () => {
  const accepted = await readQuoteResponse(Response.json(
    { message: 'Your quote request has been accepted for delivery.' },
    { status: 200 },
  ))

  assert.deepEqual(accepted, { kind: 'accepted' })
})
