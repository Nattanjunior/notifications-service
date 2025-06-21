import { NotificationRepository } from 'src/app/repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { Injectable } from '@nestjs/common';

interface GetNotificationRequest {
  recipientId: string;
}

interface GetNotificationResponse {
  notification: Notification[];
}

@Injectable()
export class GetRecipientNotification {

  constructor(private notificationsRepository: NotificationRepository) { }
  async execute(
    request: GetNotificationRequest,
  ): Promise<GetNotificationResponse> {
    const { recipientId } = request;

    const notification = await this.notificationsRepository.findManyRecipientId(recipientId)


    return {
      notification,
    };
  }
}
