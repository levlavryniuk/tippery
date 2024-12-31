import { Module } from '@nestjs/common';
import { JarsService } from './jars.service';
import { JarsController } from './jars.controller';
import { DatabaseModule } from 'src/db/database.module';
import { DrizzleService } from 'src/db/database.service';

@Module({
  controllers: [JarsController],
  providers: [JarsService, DrizzleService],
})
export class JarsModule {}
