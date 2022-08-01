import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './../dtos';
import { LoginDocDecorator } from '../swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @LoginDocDecorator()
    async signIn(@Body() loginDto: LoginUserDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginDto);
    } 
}
