import { Body, Controller, Get, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse, User } from "src/model/user.model";
import { UserGuard } from "./user.guard";

@Controller('api/users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async register(
        @Body() request: RegisterUserRequest
    ): Promise<WebResponse<RegisterUserResponse>> {
        const result = await this.userService.registerUser(request);
        return {
            data: result,
            message: 'User registered successfully',
        }
    }

    @Post('login')
    async login(
        @Body() request: LoginUserRequest
    ): Promise<WebResponse<LoginUserResponse>> {
        const result = await this.userService.LoginUser(request);
        return {
            data: result,
            message: 'User logged in successfully',
        }
    }

    @UseGuards(UserGuard)
    @Get('profile')
    async getProfile(@Request() req) : Promise<WebResponse<User>> {
        const user = req.user;
        console.log('User profile request:', user);
        const result = await this.userService.getUserProfile(user.userId);
        return {
            data: result,
            message: 'User profile retrieved successfully',
        }
    }
}