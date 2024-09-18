import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: String

    @Prop({ required: true })
    password: String

    @Prop({ type: [Types.ObjectId], ref: 'Channel', default: [] })  // Array of ObjectId
    channels: Types.ObjectId[];

    @Prop({ default: null })
    token: String

}

export const UserSchema = SchemaFactory.createForClass(User)