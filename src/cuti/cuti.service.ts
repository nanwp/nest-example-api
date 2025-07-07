import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/cummon/prisma.service";
import { ValidationService } from "src/cummon/validation.service";
import { JenisCuti } from "src/model/cuti.model";
import { User } from "src/model/user.model";
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

    async getSupervisors(): Promise<User[]> {
        this.logger.info('Fetching supervisors');

        const supervisors = await this.prismaService.user.findMany({
            where: {
                role: 'supervisor',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!supervisors || supervisors.length === 0) {
            this.logger.warn('No supervisors found');
            return [];
        }

        return supervisors.map(supervisor => ({
            id: supervisor.id,
            name: supervisor.name,
            email: supervisor.email,
            position: supervisor.position,
            createdAt: supervisor.createdAt,
            updatedAt: supervisor.updatedAt,
            role: supervisor.role,
            username: supervisor.username,
        }));
    }

    async createDefaultSupervisors() {
        // Check if supervisors already exist
        const existingSupervisors = await this.prismaService.user.findMany({
            where: {
                role: 'supervisor',
            },
        });
        if (existingSupervisors.length > 0) {
            this.logger.warn('Supervisors data already exists, skipping creation');
            return {
                message: 'Supervisors data already exists, skipping creation',
            };
        }

        // create default supervisors
        this.logger.info('Creating default supervisors data');
        await this.prismaService.user.createMany({
            data: [
                {
                    name: 'Supervisor 1',
                    username: 'supervisor1',
                    email: 'supervisor1@example.com',
                    position: 'Manager',
                    role: 'supervisor',
                    password: 'supervisor1password', // Use a secure password in production
                },
                {
                    name: 'Supervisor 2',
                    username: 'supervisor2',
                    email: 'supervisor2@example.com',
                    position: 'Team Lead',
                    role: 'supervisor',
                    password: 'supervisor2password', // Use a secure password in production
                },
                {
                    name: 'Supervisor 3',
                    username: 'supervisor3',
                    email: 'supervisor3@example.com',
                    position: 'Senior Developer',
                    role: 'supervisor',
                    password: 'supervisor3password', // Use a secure password in production
                },
            ],
        });

        this.logger.info('Default supervisors data created successfully');
        return {
            message: 'Default supervisors data created successfully',
        };
    }

    async createDefaultDataJenisCuti() {
        // Check if jenis cuti already exists
        const existingJenisCuti = await this.prismaService.jenisCuti.findMany();
        if (existingJenisCuti.length > 0) {
            this.logger.warn('Jenis cuti data already exists, skipping creation');
            return {
                message: 'Jenis cuti data already exists, skipping creation',
            };
        }

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