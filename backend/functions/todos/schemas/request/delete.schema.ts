import { z } from 'zod';

export const schema = z.object({
  pathParameters: z.object({
    id: z.string().cuid2(),
  }),
});

export type DeleteEvent = z.infer<typeof schema>;
