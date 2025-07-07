import { Body, Controller, Delete, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CutiService } from "./cuti.service";
import { UserGuard } from "src/user/user.guard";
import { CreateCutiRequest } from "src/model/cuti.model";

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

    @UseGuards(UserGuard)
    @Get('supervisors')
    async getSupervisors() {
        const supervisors = await this.cutiService.getSupervisors();
        return {
            data: supervisors,
            message: 'Supervisors retrieved successfully',
        };
    }

    @Post('supervisors/seed')
    async seedSupervisors() {
        await this.cutiService.createDefaultSupervisors();
        return {
            message: 'Supervisors seeded successfully',
        };
    }
    @Delete('supervisors/seed')
    async deleteSupervisors() {
        await this.cutiService.deleteAllSupervisors();
        return {
            message: 'Supervisors deleted successfully',
        };
    }

    @UseGuards(UserGuard)
    @Post('create')
    async createCuti(@Body() request: CreateCutiRequest, @Request() req) {
        const user = req.user;
        await this.cutiService.createCuti(request, user.userId);
        return {
            message: 'Cuti request created successfully',
        };
    }

    @UseGuards(UserGuard)
    @Get('list')
    async getListCuti(@Request() req) {
        const user = req.user;
        const cutiList = await this.cutiService.getCutiByUserId(user.userId);
        return {
            data: cutiList,
            message: 'Cuti list retrieved successfully',
        };
    }
}