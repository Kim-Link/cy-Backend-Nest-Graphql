import { Connection } from 'mongoose';
import { Cat, CatSchema } from '../entities/cat.entity';

export const catsProviders = [
  {
    provide: Cat.name,
    useFactory: (connection: Connection) =>
      connection.model(Cat.name, CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
