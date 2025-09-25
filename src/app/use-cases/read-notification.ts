import { NotificationRepository } from '@app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationFound();
    }

    notification.read();
    await this.notificationsRepository.save(notification)
  }
}
