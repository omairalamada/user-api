import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from './../../modules/users/entities/user.entity';

export default (size: number) =>
  class UserSeeder implements Seeder {
    public async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager
    ) {

      const userFactory = await factoryManager.get(UserEntity);
      await userFactory.saveMany(size);
    }
  }
