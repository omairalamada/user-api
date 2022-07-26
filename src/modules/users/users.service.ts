import { IsEmail } from 'class-validator';
import { ErrorMessages } from './../../common/error-messages.enum';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from './../../exceptions/user-not-found.exception';

@Injectable()
export class UsersService { 
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
    ) {}

    findOne( findData: FindOneOptions<UserEntity>): Promise<Partial<UserEntity>> {
        return this.userRepo.findOne(findData)
    }

    async createUser(user: UserDto): Promise<UserEntity> {
        const { password, username, email } = user
        const found = await this.findOne({ where: { username }})

        // hash
        const salt = await bcrypt.genSalt();
        // generate hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        if (found && found.username === username) {
            throw new BadRequestException(ErrorMessages.USERNAME_USED);
        }

        const isEmailRegistered = await this.findOne({ where: { email }});
        if(isEmailRegistered && isEmailRegistered.email === email) {
            throw new BadRequestException(ErrorMessages.ALREADY_REGISTERED);
        }

        const newUser = this.userRepo.create({
            ...user,
            password: hashedPassword,
        })

        const saved: UserEntity = await this.userRepo.save(newUser);

        return saved;
    }

    async deleteUser(id: number): Promise<UserEntity> {
        const user = (await this.findOne({ where: { id },})) as UserEntity;

        if(!user) throw new UserNotFoundException();

        return this.userRepo.remove(user);    
    }

    async getAllUsers(): Promise<UserEntity[]> {
        const users: UserEntity[] = (await this.userRepo.find()) || []

        return users;
    }

    async editUser(id: number, userDto: UserDto): Promise<UserEntity> {
        const user = await this.userRepo.findOne({ where: { id }});

        if(!user) {
            throw new NotFoundException('User not found!');
        }

        const newUser = new UserEntity()
        newUser.id = user.id;
        newUser.firstName = userDto.firstName || null;
        newUser.lastName = userDto?.lastName || null;
        newUser.address = userDto?.address || null;
        newUser.postCode = userDto?.postCode || null;
        newUser.email = userDto?.email || null;
        newUser.username = userDto?.username || null;
        newUser.password = userDto?.password || null;

        const updateUserDetails: UserEntity = await this.userRepo.save(newUser);

        return updateUserDetails;
    }
}
