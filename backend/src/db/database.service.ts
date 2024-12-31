import { Inject, Injectable } from '@nestjs/common';
import { Db, DB_KEY } from 'src/shared';

@Injectable()
export class DrizzleService {
  constructor(@Inject(DB_KEY) readonly db: Db) {}
}
