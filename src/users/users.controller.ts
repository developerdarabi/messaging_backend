// src/pusher.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('')
  async loginUser(
    @Body('name') name: string,
  ) {
    const user = await this.userService.login(name);
    return { user };
  }
  @Post('search')
  async searchUsers(
    @Body('name') name: string,
  ) {
    const users = await this.userService.search(name);
    return { users };
  }
}
