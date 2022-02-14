import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const ormconfig: MysqlConnectionOptions = {
  type: 'mysql',
  username: 'devuser',
  database: 'nestjs_training',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default ormconfig;
