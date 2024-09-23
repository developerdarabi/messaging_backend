// src/pusher.controller.ts
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChannelsService } from 'src/channels/channel.service';
import { UsersService } from 'src/users/users.service';
import { generatePvChatName } from 'src/utils';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService, private readonly usersService: UsersService, private readonly channelsService: ChannelsService) { }

  @Post('trigger')
  async triggerEvent(
    @Body('channel') channel: string,
    @Body('event') event: string,
    @Body('data') data: any,
  ) {
    try {
      await this.pusherService.trigger(channel, event, data);

    } catch (error) {
      console.log(error);

    }
    return { status: 'Event triggered' };
  }

  @Post('startChat')
  async startChat(
    @Body('users') users: string[],
  ) {
    const channelId = `presence-chat-${generatePvChatName(users[0],users[1])}`
    const createdChannel =  await this.channelsService.createChannel(channelId,users)
    await this.usersService.addToChannels(users[0], createdChannel._id)
    await this.usersService.addToChannels(users[1], createdChannel._id)
    return createdChannel
  }

  @Post('private')
  @UseGuards(JwtAuthGuard)
  async privateChat(
    @Body('userId') userId: string,
    @Body('message') message: string,
    @Body('channelId') channelId: string,
    @Req() req: any
  ) {
    console.log(req.user);
    const user = req.user
    try {
      const createdChannel = await this.channelsService.addMessageToChannel(channelId, user._id, message)
      // await this.usersService.addToChannels(user._id, createdChannel._id)
      // await this.usersService.addToChannels(userId, createdChannel._id)
      await this.pusherService.notifUser(userId, { message: createdChannel.messages[createdChannel.messages.length - 1], channelId });
      await this.pusherService.privateChat(channelId, { message: createdChannel.messages[createdChannel.messages.length - 1], channelId });
    } catch (error) {
      console.log(error);
      console.log('error');

    }
    return { status: 'Message sent' };
  }
  @Post('auth')
  @UseGuards(JwtAuthGuard)
  async authenticate(
    @Req() Req: Request,
    @Res() Res: Response
  ) {
    try {
      //@ts-ignore
      const user = {
        //@ts-ignore
        user_id: Req.user._id,
        //@ts-ignore
        user_info: { username: Req.user.username },
        //@ts-ignore
        channel_name: Req.body.channel_name
      }
      
      //@ts-ignore
      const auth = this.pusherService.authenticate(Req.body.socket_id, Req.body.channel_name,user);

      Res.status(200).send(auth)
    } catch (error) {
      console.log(error);

      console.log('authenticate failed');

    }
  }
}
