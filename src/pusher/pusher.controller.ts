// src/pusher.controller.ts
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { PusherService } from './pusher.service';

@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) { }

  @Post('trigger')
  async triggerEvent(
    @Body('channel') channel: string,
    @Body('event') event: string,
    @Body('data') data: any,
  ) {
    try {
      console.log(channel);
      console.log(event);
      console.log(data);

      await this.pusherService.trigger(channel, event, data);

    } catch (error) {
      console.log(error);

    }
    return { status: 'Event triggered' };
  }

  @Post('private')
  async privateChat(
    @Body('userId') userId: string,
    @Body('message') message: string,
  ) {
    try {
      await this.pusherService.privateChat(userId, message);

    } catch (error) {
      console.log(error);

    }
    return { status: 'Message sent' };
  }
  @Post('auth')
  async authenticate(
    @Req() Req: Request,
    @Res() Res: Response
  ) {
    try {
      //@ts-ignore
      const auth = this.pusherService.authenticate(Req.body.socket_id, Req.body.channel_name, { channel_name:Req.body.channel_name });
      
      Res.status(200).send(auth)
    } catch (error) {
      console.log(error);

      console.log('authenticate failed');

    }
  }
}
