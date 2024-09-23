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

  async addMessageToChannel(channelId, authorId, message) {
    let channel = await this.channelModel.findOne({ channelId: channelId });
    //@ts-ignore
    channel.messages.push({ author: authorId, text: message });
    return channel.save();
  }
  async createChannel(channelId: string, users: string[]) {
    let channel = await this.channelModel.findOne({ channelId: channelId });
    if (!channel) {
      const newChannel = new this.channelModel({
        channelId: channelId,
        users
      });
      return newChannel.save();
    }
    else {
      return channel
    }
  }
  async getChannelMessages(channelId: string) {
    return this.channelModel.findOne({ channelId }).populate({
      path: 'users',  // Populate channels field
      select: '_id username',
      // populate: {
      //     path: 'users',  // Populate users field within each channel
      //     model: 'User',   // Specify the model for users
      //     // select: '_id username',
      // }
    }).select('channelId createdAt updatedAt messages users _id')
  }
}
