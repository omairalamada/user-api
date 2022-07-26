import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {}
    

    async signIn(loginUser: LoginUserDto): Promise<{ accessToken: string }> {
        const { username, password } = loginUser;

        const user = await this.userService.findOne({ where: { username }});

        if( user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken };

        } else {
            throw new UnauthorizedException('Please check your credential');
        }
    }
}
