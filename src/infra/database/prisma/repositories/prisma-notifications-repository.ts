import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notifications';
import { NotificationRepository } from '../../../../app/repositories/notifications-repository';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) { }


  async countManyRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId
      }
    });

    return count;
  }
  
  async findManyRecipientId(recipientId: string): Promise<Notification[]> {
    const notification = await this.prismaService.notification.findMany({
      where: {
        recipientId
      },
    });

    return notification.map(PrismaNotificationMapper.toDomain)
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId
      }
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification)
  }


  async create(notification: Notification): Promise<void> {
    const row = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.create({
      data: row,
    });
  }

  async save(notification: Notification): Promise<void> {
    const row = await PrismaNotificationMapper.toPrisma(notification);

    this.prismaService.notification.update({
      where: {
        id: row.id
      },
      data: row,
    });

  }
}