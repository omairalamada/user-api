import { ResponseDto } from './../../common/dto/response.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { EditUserDocDecorator, GetAllUsersDoc, RegisterUserDocDecorator } from './swagger/user-doc.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/register')
    @RegisterUserDocDecorator()
    async createUser(@Body() userDto: UserDto): Promise<ResponseDto<UserEntity>> {
        const response = await this.userService.createUser(userDto);

        return { data: response }
    }   
    
    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        resource:  "posts",
        action:  "delete",
        possession:  'any',
    })
    @ApiOperation({ summary: 'Delete user by id', operationId: 'DeleteUser' })
    @ApiResponse({ status: 200, type: UserDto })
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }

    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        resource:  'posts',
        action:  "delete",
        possession:  'any',
    })
    @Get('display')
    @GetAllUsersDoc()
    async getAllUsers(): Promise<ResponseDto<UserEntity[]>> {
        const response = await this.userService.getAllUsers();

        return { data: response }
    }

    @UseGuards(AuthGuard(), ACGuard)
    @UseRoles({
        resource:  'posts',
        action:  "delete",
        possession:  'any',
    })
    @UseGuards(AuthGuard())
    @Patch('edit/:id')
    @EditUserDocDecorator()
    async editUser(@Param('id') id: number, @Body() userDto: UserDto): Promise<ResponseDto<UserEntity>> {
        const response = await this.userService.editUser(id, userDto);

        return { data: response };
    }
}
    