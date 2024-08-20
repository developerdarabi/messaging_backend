// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { idGenerator } from 'src/utils';

dotenv.config();

@Injectable()
export class UsersService {
  public users: any[] = []

  login(name: string) {
    const user = { name, id: idGenerator(), createdDate: new Date().toString(), messages: [] }
    this.users.push(user)
    return user
  }

  search(name: string) {
    const regex = /a/; // Regular expression to match strings containing 'a'
    const filteredUsers = this.users.filter(item => regex.test(item.name));
    return filteredUsers
  }

}
