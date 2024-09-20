import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { MessageSchema } from './message.schema';

@Schema({ timestamps: true })
export class Channel extends Document {

    @Prop({ required: true })
    channelId: String

    @Prop({ default: [], type: [MessageSchema] })
    messages: typeof MessageSchema[];

    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })  // Array of ObjectId
    channels: Types.ObjectId[];

}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
