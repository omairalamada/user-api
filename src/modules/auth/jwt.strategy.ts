import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from './../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {
        super({
            secretOrKey: 'secretkey',
            jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const { username } = payload;
        const user: UserEntity = await this.userRepo.findOne({ where: { username }});
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}