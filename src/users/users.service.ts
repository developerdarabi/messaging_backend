// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { Channel } from 'src/channels/channel.schema';
import { User } from './user.schema';

dotenv.config();

@Injectable()
export class UsersService {
  public users: any[] = []

  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Channel.name) private channelModel: Model<Channel>) { }

  search(userId: string, username: string) {
    const foundedUser = this.userModel.find({ _id: { $ne: userId }, username: { $regex: username } })
    return foundedUser
  }

  addToChannels(userId, channelId) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { channels: channelId } }, // Add the channelId to the user's channels list, avoiding duplicates
      { new: true } // Return the updated user
    )
  }
}
