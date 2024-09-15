// src/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';
import * as Pusher from 'pusher';

dotenv.config();

@Injectable()
export class PusherService {
  private pusher: Pusher;

  private proxyIp = '123.45.67.89'
  private proxyPort = '8080'
  //@ts-ignore
  private proxyAgent = new HttpsProxyAgent({
    host: this.proxyIp,
    port: this.proxyPort
  })

  constructor() {

    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
      //@ts-ignore
      httpAgent: this.proxyAgent,
      httpsAgent: this.proxyAgent,
    });
  }

  trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }

  privateChat(userId: string, message: string, date: string) {
    const channelName = `private-notifications-${userId}`
    return this.pusher.trigger(channelName, 'new-message', { message, userId, date });
  }
  authenticate(sockerId: string, channel: string, user: any) {
    return this.pusher.authenticate(sockerId, channel, { user_id: user.channel_name.split('-')[2] })
  }
}
