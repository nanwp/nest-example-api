import { z, ZodType } from "zod";

export class CutiValidation {
    static readonly CREATE_CUTI: ZodType = z.object({
        idJenisCuti: z.string().cuid(),
        idSubJenisCuti: z.string().cuid().optional(),
        tanggalMulai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/, {
            message: 'tanggalMulai must be in format YYYY-MM-DDTHH:mm:ss.SSS'
        }),
        tanggalSelesai: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/, {
            message: 'tanggalSelesai must be in format YYYY-MM-DDTHH:mm:ss.SSS'
        }),
        keterangan: z.string().max(255).optional(),
        fileUrl: z.string().max(255).optional(),
        supervisorId: z.string().cuid().optional(),
    });
}