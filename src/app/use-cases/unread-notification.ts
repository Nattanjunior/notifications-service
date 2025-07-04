import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationFound();
    }

    notification.unread();
    await this.notificationsRepository.save(notification)
  }
}
