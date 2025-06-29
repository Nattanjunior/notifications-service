import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationFound();
    }

    notification.cancel();
    await this.notificationsRepository.save(notification)
  }
}
