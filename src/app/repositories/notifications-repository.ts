import { Notification } from '../entities/notifications'

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyRecipientId(recipientId: string): Promise<number>;
  abstract findManyRecipientId(recipientId: string): Promise<Notification[]>;
}