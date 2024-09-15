import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';

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

    async userInfo(userToken: string) {
        const userId = await this.jwtService.decode(userToken.split(' ')[1])
        const user = await this.userModel.findOne({ _id: userId })
        return {
            token: userToken,
            user: {
                user: user.username,
                channels: user.channels,
                _id: user._id
            }
        }
    }
}
