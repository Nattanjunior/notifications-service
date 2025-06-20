import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationRepository } from '@/app/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';

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
