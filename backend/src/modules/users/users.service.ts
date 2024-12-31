import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/db/database.service';
import { UserInsert, users } from 'src/db/schema';

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService) {}

  async create(user: UserInsert) {
    return await this.drizzle.db.insert(users).values(user).returning();
  }

  async get(userId: string) {
    return await this.drizzle.db.query.users.findFirst({
      where: eq(users.id, +userId),
    });
  }

  async update() {}
}
