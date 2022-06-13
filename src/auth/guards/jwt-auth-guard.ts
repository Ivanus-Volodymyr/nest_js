import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeaders = request.headers.authorization;
      const bearer = authHeaders.split(' ')[0];
      const accessToken = authHeaders.split(' ')[1];

      if (bearer !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException(
          HttpStatus.UNAUTHORIZED,
          'UNAUTHORIZED',
        );
      }

      request.user = this.jwtService.verify(accessToken, {
        secret: 'ACCESS',
      });
      // console.log(request.user);

      return true;
    } catch (e) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
    }
  }
}
