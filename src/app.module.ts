// src/app.module.ts
import { Module } from '@nestjs/common';
import { PusherController } from './pusher/pusher.controller';
import { PusherService } from './pusher/pusher.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [PusherController, UsersController],
  providers: [PusherService, UsersService],
})
export class AppModule { }
