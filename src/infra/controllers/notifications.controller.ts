import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNotificationDto } from '../http/dto/create-notification.dto';
import { UpdateNotificationDto } from '../http/dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {

  }


}
