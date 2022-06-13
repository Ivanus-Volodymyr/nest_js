import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './dto/login-user-dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.authService.login(loginData);
  }

  @Post('registration')
  registration(@Body() registrationData: CreateUserDto) {
    return this.authService.registration(registrationData);
  }
}
