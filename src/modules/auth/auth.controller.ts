import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginDocDecorator } from './login-doc.decorator';

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
