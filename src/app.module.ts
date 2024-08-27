// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PusherController } from './pusher/pusher.controller';
import { PusherService } from './pusher/pusher.service';
import { User, UserSchema } from './users/user.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/messaging'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [PusherController, UsersController],
  providers: [PusherService, UsersService],
})
export class AppModule { }
