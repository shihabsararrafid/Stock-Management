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
