import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { DB_KEY } from 'src/shared';

@Global()
@Module({
  providers: [
    ConfigService,
    {
      provide: DB_KEY,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const url = config.get('DATABASE_URL');
        const sql = neon(url);
        const db = drizzle(sql, { schema });
        return db;
      },
    },
  ],
  exports: [DB_KEY, ConfigService],
})
export class DatabaseModule {}
