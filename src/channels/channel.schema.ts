import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { MessageSchema } from './message.schema';

@Schema({ timestamps: true })
export class Channel extends Document {

    @Prop({ required: true })
    channelId: String

    @Prop({ default: [], type: [MessageSchema] })
    messages: typeof MessageSchema[];

}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
