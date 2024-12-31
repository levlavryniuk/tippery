import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/shared/guards';
import { GetUser } from '../auth/user.decorator';
import { JwtPayload } from 'src/shared/jwt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  user(@GetUser() { sub }: JwtPayload) {
    return this.usersService.get(sub);
  }
}
