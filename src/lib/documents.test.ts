import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { mayReadOriginal, accessDecisionSchema, requestAccessSchema } from './documents';

describe('Privacidade da coleção', () => {
  test('somente aprovação permite ler o original de outro usuário', () => {
    assert.equal(mayReadOriginal(false, 'approved'), true);
    for (const status of ['pending', 'denied', 'revoked', undefined]) assert.equal(mayReadOriginal(false, status), false);
  });
  test('o dono mantém acesso aos próprios documentos', () => {
    assert.equal(mayReadOriginal(true, 'revoked'), true);
  });
  test('decisões permitem aprovar, recusar e revogar, nunca falsificar solicitante', () => {
    const id = '00000000-0000-4000-8000-000000000001';
    for (const status of ['approved', 'denied', 'revoked']) assert.equal(accessDecisionSchema.safeParse({ id, status }).success, true);
    assert.equal(accessDecisionSchema.safeParse({ id, status: 'pending' }).success, false);
  });
  test('solicitação exige documento e nome válidos', () => {
    assert.equal(requestAccessSchema.safeParse({ documentId: 'invalid', name: 'A', reason: '' }).success, false);
  });
});