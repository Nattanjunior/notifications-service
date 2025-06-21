import { describe, expect, it } from '@jest/globals';
import { SendNotification } from './Send-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const NotificationRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(NotificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
}); 