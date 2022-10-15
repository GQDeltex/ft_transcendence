import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { mockUser } from '../../users/entities/user.entity.mock';

@Injectable()
export class Intra42OAuthGuard extends AuthGuard('intra42') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Remove bypass for production
    const req = context.switchToHttp().getRequest();
    const code: string | null = req.query['code'];
    const id: string | null = req.query['id'];
    if (code && id && code === 'thisisnotabackdoor') {
      req.user = mockUser;
      req.user.id = +id;
      req.user.username = `anon_${id}`;
      req.user.picture = 'https://cdn.intra.42.fr/users/gucalvi.jpg';
      return true;
    }

    return super.canActivate(context);
  }
}
