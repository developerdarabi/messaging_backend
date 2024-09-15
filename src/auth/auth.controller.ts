import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('')
    async login(@Body() body: { username: string; password: string }) {
        const foundedUser = await this.authService.findUser(body.username);
        const requestedUser = { username: body.username, password: body.password }
        if (foundedUser) {
            // Ensure you are calling the method `validateUser`
            const user = await this.authService.validateUser(requestedUser, foundedUser);
            if (!user) {
                return { message: 'Invalid credentials' };
            }
            return this.authService.login(user);
        }
        else {
            const signedUpUser = await this.authService.signUp(requestedUser.username, requestedUser.password);
            return this.authService.login(signedUpUser);
        }
    }
    @Delete(':_id')
    async Logout(@Param('_id') _id: string) {
        this.authService.logout(_id)
        return { message: 'logouted successfully' }
    }
}
