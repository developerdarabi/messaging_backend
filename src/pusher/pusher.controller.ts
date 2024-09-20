// src/pusher.controller.ts
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChannelsService } from 'src/channels/channel.service';
import { UsersService } from 'src/users/users.service';
import { PusherService } from './pusher.service';
import { generatePvChatName } from 'src/utils';

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
    const channelName = `private_chat_${user._id}_${userId}`
    try {
      const user = req.user
      const createdChannel = await this.channelsService.addToChannel(channelId, user._id, message)
      await this.usersService.addToChannels(user._id, createdChannel._id)
      await this.usersService.addToChannels(userId, createdChannel._id)
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
      const auth = this.pusherService.authenticate(Req.body.socket_id, Req.body.channel_name, { channel_name: Req.body.channel_name });

      Res.status(200).send(auth)
    } catch (error) {
      console.log(error);

      console.log('authenticate failed');

    }
  }
}
