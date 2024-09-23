// src/pusher.controller.ts
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Channel } from './channel.schema';
import { ChannelsService } from './channel.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService, @InjectModel(Channel.name) private channelModel: Model<Channel>) { }

  @Get(':channelId')
  @UseGuards(JwtAuthGuard)
  async searchUsers(
    @Param('channelId') channelId: string,
  ) {
    return this.channelsService.getChannelMessages(channelId)
  }

}
