import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DrizzleService } from 'src/db/database.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/jwt/jwt.strategy';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
  ],
  providers: [AuthService, DrizzleService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
