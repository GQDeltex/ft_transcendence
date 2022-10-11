import {
  Injectable,
  ExecutionContext,
  Inject,
  CanActivate,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Socket } from 'socket.io';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookie: undefined | string = client.handshake.headers.cookie;
    if (typeof cookie === 'undefined') return false;
    const tokenCookie: string | undefined = cookie
      .split('; ')
      .find((c: string) => c.startsWith('jwt'));
    if (typeof tokenCookie === 'undefined') return false;
    const token: string = tokenCookie.split('=')[1];
    const jwtService: JwtService = new JwtService();
    const user: any = jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    user.id = Number(user.sub);
    delete user.sub;
    if (!user) return false;
    client.data.user = user;
    return true;
  }
}

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
