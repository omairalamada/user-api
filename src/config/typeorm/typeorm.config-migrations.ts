import { DataSource } from 'typeorm'
import { typeOrmConfig } from './typeorm.config'

const datasource = new DataSource(typeOrmConfig()) // config is one that is defined in typeorm.config.ts file
datasource.initialize()
export default datasource
