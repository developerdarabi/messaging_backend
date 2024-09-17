import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {

    @Prop({ required: true })
    text: String

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: Types.ObjectId;

}

export const MessageSchema = SchemaFactory.createForClass(Message)