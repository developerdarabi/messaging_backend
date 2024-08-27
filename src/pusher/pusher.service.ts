// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Pusher from 'pusher';

dotenv.config();

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
  authenticate(sockerId: string, channel: string, user: any) {
    return this.pusher.authenticate(sockerId, channel, {
      user_id: user.id,
      user_info: {
        name: user.name
      }
    })
  }
}
