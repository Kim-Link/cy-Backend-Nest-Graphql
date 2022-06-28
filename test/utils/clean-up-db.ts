import { getConnectionToken } from '@nestjs/mongoose';

export const cleanUpDb = async () => {
  const connection = getConnectionToken('Attale-Pro');
};
