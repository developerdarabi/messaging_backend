import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<User>) { }

    async validateUser(requestedUser, foundedUser): Promise<any> {
        const isMatch = await bcrypt.compare(requestedUser.password, foundedUser.password);

        if (isMatch) {
            return foundedUser;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, _id: user._id };
        const generatedToken = this.jwtService.sign(payload)
        await this.userModel.updateOne({ _id: user._id }, { token: generatedToken })
        return {
            token: generatedToken,
            user: {
                user: user.username,
                channels: user.channels,
                _id: user._id
            }
        };
    }

    async signUp(username: string, password: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const createdUser = new this.userModel({ username, password: hashedPassword })
        return createdUser.save()
    }

    async logout(userId) {
        return this.userModel.updateOne({ _id: userId }, { token: null })
    }

    async findUser(username: string) {
        return this.userModel.findOne({ username })
    }

    async userInfo(userId, userToken: string) {

        const user = await this.userModel.findById(userId).populate({
            path: 'channels',  // Populate channels field
            select: '_id users channelId',
            populate: {
                path: 'users',  // Populate users field within each channel
                model: 'User',   // Specify the model for users
                select: '_id username',
                match: { _id: { $ne: userId } } 
            }
        }).select('channels  updatedAt createdAt  username')
        console.log(user);

        return {
            token: userToken.split(' ')[1],
            user: user
        }
    }
}
