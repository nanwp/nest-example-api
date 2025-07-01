import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CummonModule } from './cummon/cummon.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CummonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
