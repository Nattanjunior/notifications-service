import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notifications';
import { NotificationRepository } from '../../../../app/repositories/notifications-repository';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) { }

  async create(notification: Notification): Promise<void> {
    const row = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.create({
      data: row,
    });
  }
}