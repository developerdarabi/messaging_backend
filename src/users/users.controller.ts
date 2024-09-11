// src/pusher.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const findedUser = await this.userService.findUser(username);
    if (findedUser) {
      const isPasswordCorrect = await this.userService.checkPassword(username, password);
      if (isPasswordCorrect) {
        const signedInUser = await this.userService.signIn(username);
        //@ts-ignore
        return { user: { username: signedInUser.username, createdAt: signedInUser.createdAt, updatedAt: signedInUser.updatedAt, _id: signedInUser._id, channels: signedInUser.channels } }
      }
      else {
        return { message: 'Password is not correct' }
      }
    }
    const signedUpUser = await this.userService.signUp(username, password);
    //@ts-ignore
    return { user: { username: signedUpUser.username, createdAt: signedUpUser.createdAt, updatedAt: signedUpUser.updatedAt, _id: signedUpUser._id, channels: signedUpUser.channels } }

  }
  @Post('search')
  async searchUsers(
    @Body('name') name: string,
  ) {
    const users = await this.userService.search(name);
    return { users };
  }
}
