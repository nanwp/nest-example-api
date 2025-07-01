import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/cummon/prisma.service";
import { ValidationService } from "src/cummon/validation.service";
import { RegisterUserRequest, RegisterUserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)private logger: Logger,
        private prismaService: PrismaService,
    ) {}
    async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
        this.logger.info('Registering user', { request });

        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username,
            }
        });

        if (totalUserWithSameUsername > 0) {
            this.logger.warn('Username already exists', { username: registerRequest.username });
            throw new HttpException('Username already exists', 400);
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                name: registerRequest.name,
                password: registerRequest.password,
            }
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
}
