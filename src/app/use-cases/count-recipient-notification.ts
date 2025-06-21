import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationFound } from './errors/notification-not-found';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyRecipientId(recipientId)

    return {
      count,
    }
  }
}
