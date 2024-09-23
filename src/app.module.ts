// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ChannelsController } from './channels/channel.controller';
import { Channel, ChannelSchema } from './channels/channel.schema';
import { ChannelsService } from './channels/channel.service';
import { PusherController } from './pusher/pusher.controller';
import { PusherService } from './pusher/pusher.service';
import { User, UserSchema } from './users/user.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/messaging'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
    AuthModule,
  ],
  controllers: [PusherController, UsersController, AuthController, ChannelsController],
  providers: [PusherService, UsersService, ChannelsService],
})
export class AppModule { }
