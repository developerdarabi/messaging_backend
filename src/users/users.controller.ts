// src/pusher.controller.ts
import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.schema';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, @InjectModel(User.name) private userModel: Model<User>) { }

  @Post('search')
  async searchUsers(
    @Body('username') username: string,
  ) {
    const users = await this.userService.search(username);
    return { users };
  }

}
