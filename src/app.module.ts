import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CummonModule } from './cummon/cummon.module';
import { UserModule } from './user/user.module';
import { CutiModule } from './cuti/cuti.module';

@Module({
  imports: [CummonModule, UserModule, CutiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
