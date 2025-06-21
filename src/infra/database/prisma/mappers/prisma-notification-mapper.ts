import { Content } from '@app/entities/content'
import { Notification } from '@app/entities/notifications'
import { Notification as RowNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    }
  }

  static toDomain(row: RowNotification) {
    return new Notification(
      {
        category: row.category,
        content: new Content(row.content),
        recipientId: row.recipientId,
        readAt: row.readAt,
        createdAt: row.createdAt,
        canceledAt: row.canceledAt,
      },
      row.id
    )
  }
}