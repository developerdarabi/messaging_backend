// src/pusher.controller.ts
import { Body, Controller, Post, Req } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('')
export class PusherController {
  constructor(private readonly pusherService: PusherService) { }

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
}
