import { ConflictException, Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/db/database.service';
import { CreateJarDto } from './dto/create-jar.dto';
import { JarInsert, jars } from 'src/db/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class JarsService {
  constructor(private drizzle: DrizzleService) {}

  async create(dto: CreateJarDto) {
    const exists = !!(await this.drizzle.db.query.jars.findFirst({
      where: and(eq(jars.id, +dto.ownerId), eq(jars.title, dto.title)),
    }));

    if (exists) {
      return new ConflictException('Jar with this title already exists');
    }

    const jarInsert: JarInsert = dto;

    await this.drizzle.db.insert(jars).values(jarInsert);
  }
  async get(jarId: number) {
    return await this.drizzle.db.query.jars.findFirst({
      where: eq(jars.id, jarId),
      columns: {
        title: true,
        id: true,
        description: true,
        totalDonations: true,
        ownerId: true,
        currency: true,
        minimalPrice: true,
      },
    });
  }
}
