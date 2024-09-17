import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
<<<<<<< HEAD

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: String

    @Prop({ required: true })
    password: String

    @Prop({ default: [] })
    channels: String[]

    @Prop({ default: null })
    token: String

}

export const UserSchema = SchemaFactory.createForClass(User)
=======
import { MessageSchema } from './message.schema';

@Schema({ timestamps: true })
export class Channel extends Document {

    @Prop({ required: true })
    channelId: String

    @Prop({ default: [], type: [MessageSchema] })
    messages: typeof MessageSchema[];

}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
>>>>>>> 3d26cfc52e58d42c62b3e2963c21d0083ca36aba
