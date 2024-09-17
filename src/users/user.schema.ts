import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: String

    @Prop({ required: true })
    password: String

    @Prop({ default: [] })
    channels: [{ type: Types.ObjectId, ref: 'Channel' }]

    @Prop({ default: null })
    token: String

}

export const UserSchema = SchemaFactory.createForClass(User)