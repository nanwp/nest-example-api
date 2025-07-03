import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        })
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {
}