import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().optional(),
  nome: z
    .string({
      message: 'O nome é obrigatório',
    })
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z
    .string({
      message: 'O e-mail é obrigatório',
    })
    .email('O e-mail deve ser válido'),
  createdAt: z.string().optional(),
})
