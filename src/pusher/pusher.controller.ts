// src/pusher.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Controller('')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Post('trigger')
  async triggerEvent(
    @Body('channel') channel: string,
    @Body('event') event: string,
    @Body('data') data: any,
  ) {
    await this.pusherService.trigger(channel, event, data);
    return { status: 'Event triggered' };
  }
}
