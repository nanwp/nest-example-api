import { Module } from "@nestjs/common";
import { CutiService } from "./cuti.service";
import { CutiController } from "./cuti.controller";

@Module({
    imports: [],
    controllers: [CutiController],
    providers: [CutiService],
})
export class CutiModule {}