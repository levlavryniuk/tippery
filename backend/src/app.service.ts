import { Injectable } from '@nestjs/common';
import { DrizzleService } from './db/database.service';

@Injectable()
export class AppService {
  constructor(private drizzle: DrizzleService) {}

  async getHello() {
    return await this.drizzle.db.query.users.findMany();
  }
}
