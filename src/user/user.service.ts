import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/cummon/prisma.service";
import { ValidationService } from "src/cummon/validation.service";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse, User } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER)private logger: Logger,
        private prismaService: PrismaService,
        private jwtService: JwtService, 
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

    async LoginUser(request: LoginUserRequest): Promise<LoginUserResponse> {
        this.logger.info('Logging in user', { request });

        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request);

        const user = await this.prismaService.user.findUnique({
            where: {
                username: loginRequest.username,
            }
        });

        if (!user) {
            this.logger.warn('User not found', { username: loginRequest.username });
            throw new HttpException('User not found', 404);
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            this.logger.warn('Invalid password', { username: loginRequest.username });
            throw new HttpException('Invalid password', 401);
        }

        const accessToken = await this.jwtService.signAsync({ userId: user.id, username: user.username });

        const response: LoginUserResponse = {
            User: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            accessToken: accessToken,
        };
        
        return response;
    }

    async getUserProfile(userId: string): Promise<User> {
        this.logger.info('Retrieving user profile', { userId });

        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            }
        });

        if (!user) {
            this.logger.warn('User not found', { userId });
            throw new HttpException('User not found', 404);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
