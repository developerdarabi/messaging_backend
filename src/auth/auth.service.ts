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
        console.log(userId);

        const user = await this.userModel.aggregate([
            {
                $match: { _id: new ObjectId(userId) }  // Match specific user by ObjectId
            },
            {
                $lookup: {
                    from: 'channels',  
                    localField: 'channels', 
                    foreignField: '_id', 
                    as: 'channels'
                }
            },
            {
                $project: {
                    'channels._id': 1, 
                    'channels.channelId': 1,
                    username: 1, 
                    createdAt: 1, 
                    updatedAt: 1,
                }
            }
        ]).exec();

        return {
            token: userToken.split(' ')[1],
            user:user[0]
        }
    }
}
