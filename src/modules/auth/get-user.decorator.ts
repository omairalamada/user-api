import { UserEntity } from './../users/entities/user.entity';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
})