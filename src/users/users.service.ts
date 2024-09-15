// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { User } from './user.schema';

dotenv.config();

@Injectable()
export class UsersService {
  public users: any[] = []

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  search(name: string) {
    const findedUsers = this.userModel.find({ name: { $regex: name } })
    return findedUsers
  }

}
