import { Notification } from '../entities/notifications'

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}