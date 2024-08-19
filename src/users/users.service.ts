// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { idGenerator } from 'src/utils';

dotenv.config();

@Injectable()
export class UsersService {
  public users: any[] = []

  login(name: string) {
    const user = { name, id: idGenerator(), createdDate: new Date().toString() }
    this.users.push(user)
    return this.users
  }
}
