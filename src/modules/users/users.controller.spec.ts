import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        createUser: jest.fn(() => []),
        editUser: jest.fn(() => []),
        deleteUser: jest.fn(() => []),
        getAllUsers: jest.fn(() => []),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it("should call createUser controller method to create new user", () => {
    const userDto = new UserDto();
    expect(userController.createUser(userDto)).not.toEqual(null);
  })

  it('should call createUser for same parameters', () => {
    const userDto = new UserDto();

    userController.createUser(userDto);
    expect(userService.createUser).toHaveBeenCalled();
    expect(userService.createUser).toBeCalledWith(userDto);
  })

  it('should call editUser method', () => {
    const userDto = new UserDto();
    const userId = userDto.id;
    userController.editUser(userId, userDto);

    expect(userService.editUser).toHaveBeenCalled();
  })

  it("should call deleteUser controller method to delete user by id", () => {
    const userDto = new UserDto();

    const userId = userDto.id = 1;
    userController.deleteUser(userId);

    expect(userService.deleteUser).toHaveBeenCalled();
  })

  it('should call getAllUsers controller method to display users', () => {
    userController.getAllUsers();
    expect(userService.getAllUsers).toHaveBeenCalled();
  })

});
