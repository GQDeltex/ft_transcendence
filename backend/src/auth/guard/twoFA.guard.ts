import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class TwoFAGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let user: any;
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      user = GqlExecutionContext.create(context).getContext().req.user;
    } else {
      user = context.switchToHttp().getRequest().user;
    }

    if (!user || !user.isAuthenticated) throw new UnauthorizedException();
    return true;
  }
}
