import { Module } from '@nestjs/common';

import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@app/use-cases/Send-notifications';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule { }
