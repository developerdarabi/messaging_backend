// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { User } from './user.schema';

dotenv.config();

@Injectable()
export class UsersService {
  public users: any[] = []

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(name: string) {
    const createdUser = new this.userModel({ name })
    return createdUser.save()
  }

  async login(name: string) {
    const findedUser = await this.userModel.findOne({ name })
    if (findedUser) return findedUser
    return this.create(name)
  }

  search(name: string) {
    const findedUsers = this.userModel.find({ name: { $regex: name } })
    return findedUsers
  }

}
