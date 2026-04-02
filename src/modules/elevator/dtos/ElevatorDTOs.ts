import { z } from 'zod';

export const uploadTextSchema = z.object({
  body: z.object({
    text: z.string().min(1, 'O texto não pode ser vazio'),
  }),
});

export const askSchema = z.object({
  body: z.object({
    question: z.string().min(1, 'A pergunta não pode ser vazia'),
  }),
});

export type UploadTextDTO = z.infer<typeof uploadTextSchema>['body'];
export type AskDTO = z.infer<typeof askSchema>['body'];
