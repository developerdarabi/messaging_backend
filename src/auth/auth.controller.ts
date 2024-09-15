import { Body, Controller, Delete, Headers, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
                throw new UnauthorizedException()
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
    @Post('info')
    @UseGuards(JwtAuthGuard)
    async userInfo(
        @Headers('Authorization') authorization: string,
    ) {
        return this.authService.userInfo(authorization)
    }
}
