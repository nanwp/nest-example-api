import { Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { CutiService } from "./cuti.service";
import { UserGuard } from "src/user/user.guard";

@Controller('api/cuti')
export class CutiController {
    constructor(
        private cutiService: CutiService
    ){}

    @UseGuards(UserGuard)
    @Get('jenis')
    async getJenisCuti() {
        const jenisCuti = await this.cutiService.getJenisCuti();
        return {
            data: jenisCuti,
            message: 'Jenis cuti retrieved successfully',
        };
    }

    @Post('jenis/seed')
    async seedJenisCuti() {
        await this.cutiService.createDefaultDataJenisCuti();
        return {
            message: 'Jenis cuti seeded successfully',
        };
    }

    @Delete('jenis/seed')
    async deleteJenisCuti() {
        await this.cutiService.deleteAllJenisCuti();
        return {
            message: 'Jenis cuti deleted successfully',
        };
    }
}