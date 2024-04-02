import { z } from 'zod'
import { zfd } from 'zod-form-data'
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
export enum updateType {
  firmware = 'firmware',
  fileSystem = 'fileSystem',
}
export const fileUploadSchema = zfd.formData({
  updateType: z.string(z.enum([updateType.fileSystem, updateType.firmware])),

  // deviceId
  file: zfd.file(),
})
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export const userCreateSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
})
