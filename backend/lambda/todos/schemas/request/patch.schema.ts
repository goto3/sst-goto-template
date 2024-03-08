import { z } from 'zod';

export const schema = z.object({
  pathParameters: z.object({
    id: z.string().cuid2(),
  }),
  body: z.object({
    text: z.string().min(0).max(5),
  }).strict(),
});

export type PatchEvent = z.infer<typeof schema>;
