// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { Channel } from 'src/channels/channel.schema';

dotenv.config();

@Injectable()
export class ChannelsService {
  public users: any[] = []

  constructor(@InjectModel(Channel.name) private channelModel: Model<Channel>) { }

  async addToChannel(channelId, authorId,message) {
    let channel = await this.channelModel.findOne({ channelId: channelId });

    if (channel) {
      // If channel exists, add the message
      //@ts-ignore
      channel.messages.push({author:authorId,text:message});
      return channel.save(); // Save the updated channel
    } else {
      // If channel does not exist, create it and add the message
      const newChannel = new this.channelModel({
        channelId: channelId,
        messages: [{author:authorId,text:message}],
      });
      return newChannel.save(); // Save the new channel
    }
  }
}
