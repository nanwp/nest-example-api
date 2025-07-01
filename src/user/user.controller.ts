import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { WebResponse } from "src/model/web.model";
import { RegisterUserRequest, RegisterUserResponse } from "src/model/user.model";

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
}