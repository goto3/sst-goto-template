import { z } from 'zod';

export const schema = z.object({
  body: z.object({
    text: z.string().min(0).max(5),
  }),
});

export type PostEvent = z.infer<typeof schema>;
