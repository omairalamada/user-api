import { Faker } from '@faker-js/faker'
import { UserEntity } from './../../modules/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension'


export default setSeederFactory(UserEntity, (faker: Faker) => {
  const user = new UserEntity()

  user.id
  user.firstName = faker.name.firstName('male')
  user.lastName = faker.name.lastName('male')
  user.address = faker.address.country()
  user.postCode = faker.address.zipCode('####')
  user.contactNumber = faker.phone.number('+63 9## ### ####')
  user.email = faker.internet.email(user.firstName, user.lastName)
  user.username = faker.internet.userName(user.firstName)
  user.password = user.username

  return user
})
