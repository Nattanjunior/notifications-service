import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { NotificationRepository } from '@app/repositories/notifications-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [NotificationRepository]
})
export class DatabaseModule { }
