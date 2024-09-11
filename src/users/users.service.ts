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

  async signUp(username: string, password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = new this.userModel({ username, password: hashedPassword })
    return createdUser.save()
  }

  signIn(username: string) {
    return this.findUser(username)
  }

  async checkPassword(username, password) {
    const findedUser = await this.findUser(username)
    //@ts-ignore
    const checked = await bcrypt.compare(password, findedUser.password);
    return checked
  }

  async findUser(username: string) {
    return this.userModel.findOne({ username })
  }

  search(name: string) {
    const findedUsers = this.userModel.find({ name: { $regex: name } })
    return findedUsers
  }

}
