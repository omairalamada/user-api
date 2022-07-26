import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRoles } from '../auth/user-roles';


describe('UsersService', () => {
  
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  })

  describe('createUser', () => {
    it('should create a new user with userame and passowrd', async () => {
      await userService.createUser({
        roles: UserRoles.Admin,
        firstName: "Omair",
        lastName: "Mangondaya",
        address: "Makati, City",
        postCode: "4217",
        contactNumber: "09303549784",
        email: "omair@gmail.com",
        username: "Omair123",
        password: "P@ssw0rd",
      })
    });
  })

});
