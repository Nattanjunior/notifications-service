import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { describe, expect, it } from '@jest/globals';
import { makeNotification } from '@test/factories/notifications-factory';

describe('Count recipients notifications', () => {
  it('should be able to count recipient a notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );



    await notificationsRepository.create(
      makeNotification({recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({recipientId: 'recipient-2'})
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1'
    });

    expect(count).toEqual(2);
  });
});