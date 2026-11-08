import { z } from 'zod';

export const requestAccessSchema = z.object({
  documentId: z.string().uuid(),
  name: z.string().trim().min(2).max(100),
  reason: z.string().trim().max(500),
});
export const accessDecisionSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['approved', 'denied', 'revoked']),
});
export function mayReadOriginal(owner: boolean, status?: string) {
  return owner || status === 'approved';
}