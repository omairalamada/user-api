import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
    Admin = 'Admin',
    User = 'User',
  }
  
  export const roles: RolesBuilder = new RolesBuilder();
  
  roles
    .grant(UserRoles.User) // define new or modify existing role. also takes an array.
      .readOwn('posts') // equivalent to .createOwn('video', ['*'])
    .grant(UserRoles.Admin) // switch to another role without breaking the chain
      .extend(UserRoles.User) // inherit role capabilities. also takes an array
      .updateAny('posts') // explicitly defined attributes
      .createAny('posts')
      .deleteAny('posts')
