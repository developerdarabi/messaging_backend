// src/pusher.controller.ts
import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  async searchUsers(
    @Body('username') username: string,
    @Req() req:any
  ) {
    const users = await this.userService.search(req.user._id,username);
    return { users };
  }

}
