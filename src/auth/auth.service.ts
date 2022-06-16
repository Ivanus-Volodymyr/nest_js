import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginData: LoginUserDto) {
    const user = await this._validate(loginData);
    return this._generateToken(user);
  }

  async registration(registrationData: CreateUserDto) {
    const user = await this.userService.getUserByEmail(registrationData.email);
    if (user) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    const savedUser = await this.userService.createUser({
      ...registrationData,
      password: hashPassword,
    });

    return this._generateToken(savedUser);
  }

  private async _generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'ACCESS',
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'REFRESH',
        expiresIn: '7d',
      }),
    ]);

    return {
      user,
      access_token: access,
      refresh_token: refresh,
    };
  }

  private async _validate(loginData: LoginUserDto) {
    const userFromDb = await this.userService.getUserByEmail(loginData.email);
    const checkPass = await bcrypt.compare(
      loginData.password,
      userFromDb.password,
    );

    if (userFromDb && checkPass) {
      return userFromDb;
    }

    throw new UnauthorizedException(
      HttpStatus.UNAUTHORIZED,
      'wrong email or password',
    );
  }

  async verifyUser(jwt: string): Promise<string | null> {
    try {
      const token = jwt.split(' ')[1];
      const user = this.jwtService.verify(token, { secret: 'ACCESS' });
      return user.id;
    } catch (e) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, e.message[0]);
    }
  }
}
