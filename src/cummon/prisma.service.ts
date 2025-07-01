import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "generated/prisma";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston"

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit{
    constructor(@Inject(WINSTON_MODULE_PROVIDER)private readonly logger: Logger) {
        super({
            log: [
                {
                    "emit": "event",
                    "level": "query",
                },
                {
                    "emit": "event",
                    "level": "info",
                },
                {
                    "emit": "event",
                    "level": "warn",
                },
                {
                    "emit": "event",
                    "level": "error",
                }
            ]
        })
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.info('PrismaService connected to the database');
        
        this.$on('query', (e) => {
            this.logger.debug(`Query: ${e.query} Params: ${e.params} Duration: ${e.duration}ms`);
        });
        this.$on('info', (e) => {
            this.logger.info(e.message);
        });
        this.$on('warn', (e) => {
            this.logger.warn(e.message);
        });
        this.$on('error', (e) => {
            this.logger.error(e.message);
        });
    }
}