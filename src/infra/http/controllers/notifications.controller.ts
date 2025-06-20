import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from '../../../infra/http/dto/create-notification.dto';
import { SendNotification } from '../../../app/use-cases/Send-notifications';
import { NotificationViewModel } from '../view-models/notification-view-models';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) { }

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
