import { Module } from '@nestjs/common';

import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@/app/use-cases/Send-notifications';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
