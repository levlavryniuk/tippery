import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JarsService } from './jars.service';
import { GetUser } from '../auth/user.decorator';
import { JwtPayload } from 'src/shared/jwt';
import { CreateJarBodyDto, CreateJarDto } from './dto/create-jar.dto';
import { JwtAuthGuard } from 'src/shared/guards';

@Controller('jars')
export class JarsController {
  constructor(private readonly jarsService: JarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(@GetUser() { sub }: JwtPayload, @Body() body: CreateJarBodyDto) {
    const dto: CreateJarDto = {
      ownerId: sub,
      ...body,
    };
    return this.jarsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getAll(@Param('id') id: number) {
    return this.jarsService.get(id);
  }
}
