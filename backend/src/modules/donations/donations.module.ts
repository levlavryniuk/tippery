import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { DatabaseModule } from 'src/db/database.module';
import { DrizzleService } from 'src/db/database.service';

@Module({
  controllers: [DonationsController],
  imports: [DatabaseModule],
  providers: [DonationsService, DrizzleService],
})
export class DonationsModule {}
