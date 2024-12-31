import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RefreshDto } from './dto/refresh.dto';
import { DrizzleService } from 'src/db/database.service';
import { eq, or } from 'drizzle-orm';
import { UserInsert, users } from 'src/db/schema';
import { JwtPayload } from 'src/shared/jwt';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

@Injectable()
export class AuthService {
  private readonly secret: string;
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow('JWT_SECRET');
  }

  async signIn({ email, password }: SignInDto, res: FastifyReply) {
    const user = await this.drizzle.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPair = await this.generateTokenPair({ sub: user.id.toString() });

    res.setCookie('accessToken', tokenPair.accessToken);
    res.setCookie('refreshToken', tokenPair.refreshToken);

    return tokenPair;
  }

  async signUp({ email, username, password }: SignUpDto) {
    const existingUser = await this.drizzle.db.query.users.findFirst({
      where: or(eq(users.email, email), eq(users.username, username)),
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const values: UserInsert = {
      email,
      password: hashedPassword,
      username,
    };
    const [newUser] = await this.drizzle.db
      .insert(users)
      .values(values)
      .returning();

    const tokenPair = await this.generateTokenPair({
      sub: newUser.id.toString(),
    });

    return tokenPair;
  }

  async refresh({ refresh_token }: RefreshDto) {
    try {
      const decoded: JwtPayload = await this.jwtService.verifyAsync(
        refresh_token,
        {
          secret: this.secret,
        },
      );
      return await this.generateTokenPair({ sub: decoded.sub });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateTokenPair(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.secret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.secret,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
