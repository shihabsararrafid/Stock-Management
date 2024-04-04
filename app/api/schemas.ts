import { z } from 'zod'
export const deviceCreateSchema = z
  .object({
    name: z.string().optional(),
    id: z.string().optional(),
    projectId: z.number(),
  })
  .strict()
export const projectCreateSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  })
  .strict()
export enum role {
  user = 'user',
  admin = 'admin',
}

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})
export const userCreateSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
})
export const productUploadSchema = z.object({
  name: z.string(),
  stock: z.number(),
  photoUrl: z.string(),
})
export const productUpdateSchema = z.object({
  name: z.string().optional(),
  stock: z.number().optional(),
  photoUrl: z.string().optional(),
})
export const userInfoUpdateSchema = z
  .object({
    image: z.string().optional(),
    role: z.enum([role.user, role.admin]).optional(),
    department: z.string().optional(),
  })
  .strict()
export const borrowerCreateSchema = z
  .object({
    userId: z.string(),
    productId: z.string(),
    value: z.number(),
    createdAt: z.string().datetime().optional(),
  })
  .strict()
export const borrowerUpdateSchema = z
  .object({
    userId: z.string().optional(),
    productId: z.string().optional(),
    value: z.number().optional(),
    createdAt: z.string().datetime().optional(),
  })
  .strict()
