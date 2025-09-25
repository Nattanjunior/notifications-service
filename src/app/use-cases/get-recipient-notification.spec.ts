
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { describe, expect, it } from '@jest/globals';
import { makeNotification } from '@test/factories/notifications-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
      notificationsRepository,
    );


    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' })
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' })
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' })
    );

    const { notification } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1'
    });

    expect(notification).toHaveLength(2);
    expect(notification).toEqual(expect.arrayContaining([
      expect.objectContaining({recipientId: 'recipient-1'}),
      expect.objectContaining({recipientId: 'recipient-1'}),
    ]));
  });
});