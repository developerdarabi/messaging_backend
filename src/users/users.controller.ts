// src/pusher.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('')
  async triggerEvent(
    @Body('name') name: string,
  ) {
    await this.userService.login(name);
    return { status: 'User logined!' };
  }
}
