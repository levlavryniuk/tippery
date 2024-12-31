import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { DatabaseModule } from './db/database.module';
import { DrizzleService } from './db/database.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JarsModule } from './modules/jars/jars.module';
import { DonationsModule } from './modules/donations/donations.module';
config();
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    JarsModule,
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
