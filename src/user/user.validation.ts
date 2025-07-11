import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(3).max(50),
        email: z.string().email().max(100),
        name: z.string().min(3).max(100),
        password: z.string().min(6).max(255),
    })

    static readonly LOGIN : ZodType = z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6).max(255),
    })
}