import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import type { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class NotificationsService {

  constructor(private readonly prisma: PrismaService) { }
  async create(createNotificationDto: CreateNotificationDto) {

    const { category, content, recipientId } = createNotificationDto
    await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }

    })
  }

  findAll() {
    return this.prisma.notifications.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
