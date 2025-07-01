import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CummonModule } from './cummon/cummon.module';

@Module({
  imports: [CummonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
