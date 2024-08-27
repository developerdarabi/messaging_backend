import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class User extends Document {
    @Prop({ required: true })
    name: String

    @Prop({ default: [] })
    channels: String[]

}

export const UserSchema = SchemaFactory.createForClass(User)