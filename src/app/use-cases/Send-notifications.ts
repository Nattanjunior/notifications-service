import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification)

    return {
      notification,
    };
  }
}
