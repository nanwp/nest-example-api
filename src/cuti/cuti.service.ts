import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/cummon/prisma.service";
import { ValidationService } from "src/cummon/validation.service";
import { JenisCuti } from "src/model/user.model";
import { Logger } from "winston";

@Injectable()
export class CutiService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ) { }
    async getJenisCuti(): Promise<JenisCuti[]> {
        this.logger.info('Fetching jenis cuti');

        const jenisCuti = await this.prismaService.jenisCuti.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!jenisCuti || jenisCuti.length === 0) {
            this.logger.warn('No jenis cuti found');
            return [];
        }

        // sub jenis cuti
        const subJenisCuti = await this.prismaService.subJenisCuti.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });

        return jenisCuti.map(jenis => ({
            id: jenis.id,
            name: jenis.name,
            createdAt: jenis.createdAt,
            updatedAt: jenis.updatedAt,
            subJenisCuti: subJenisCuti
                .filter(sub => sub.jenisCutiId === jenis.id)
                .map(sub => ({
                    id: sub.id,
                    name: sub.name,
                    jenisCutiId: sub.jenisCutiId,
                    createdAt: sub.createdAt,
                    updatedAt: sub.updatedAt,
                })),
        }));
    }

    async createDefaultDataJenisCuti() {
        // create default jenis cuti
        this.logger.info('Creating default jenis cuti data');
        await this.prismaService.jenisCuti.createMany({
            data: [
                { name: 'Cuti Tahunan' },
                { name: 'Cuti Sakit' },
                { name: 'Cuti Melahirkan' },
                { name: 'Cuti Alasan Khusus' },
                { name: 'Cuti Ibadah' },
                { name: 'Cuti Lainnya' },
            ],
        });

        // get jenis cuti for sub jenis cuti
        const jenisCuti = await this.prismaService.jenisCuti.findMany({
            where: {
                name: {
                    in: [
                        'Cuti Alasan Khusus',
                        'Cuti Ibadah',
                    ],
                },
            },
        });

        const jenisCutiMap = jenisCuti.reduce((acc, jenis) => {
            acc[jenis.name] = jenis.id;
            return acc;
        }, {});

        // create sub jenis cuti
        this.logger.info('Creating sub jenis cuti data');
        await this.prismaService.subJenisCuti.createMany({
            data: [
                { name: 'Pernikahan Karyawan Sendiri', jenisCutiId: jenisCutiMap['Cuti Alasan Khusus'] },
                { name: 'Pernikahan Anak Karyawan', jenisCutiId: jenisCutiMap['Cuti Alasan Khusus'] },
                { name: 'Pernikahan Saudara Kandung', jenisCutiId: jenisCutiMap['Cuti Alasan Khusus'] },
                { name: 'Kematian Suami/Istri, Orang Tua/Mertua', jenisCutiId: jenisCutiMap['Cuti Alasan Khusus'] },
                { name: 'Cuti Ibadah Haji', jenisCutiId: jenisCutiMap['Cuti Ibadah'] },
                { name: 'Cuti Ibadah Umroh', jenisCutiId: jenisCutiMap['Cuti Ibadah'] },
                { name: 'Cuti Ibadah Lainya', jenisCutiId: jenisCutiMap['Cuti Ibadah'] },
            ],
        });

        this.logger.info('Default jenis cuti data created successfully');
        return {
            message: 'Default jenis cuti data created successfully',
        };

    }
    async deleteAllJenisCuti() {
        await this.prismaService.jenisCuti.deleteMany({});
        return {
            message: 'All jenis cuti deleted successfully',
        };
    }
}