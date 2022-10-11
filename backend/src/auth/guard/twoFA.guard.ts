import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TwoFAGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: any = context.switchToHttp().getRequest().user;
    if (!user || !user.isAuthenticated) throw new UnauthorizedException();
    return true;
  }
}
