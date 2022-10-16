import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookies: string | undefined = client.handshake.headers.cookie;
    if (typeof cookies === 'undefined') return false;
    const tokenCookie: string | undefined = cookies
      .split('; ')
      .find((c: string) => c.startsWith('jwt'));
    if (typeof tokenCookie === 'undefined') return false;
    const token: string = tokenCookie.split('=')[1];
    const jwtService: JwtService = new JwtService();
    const user: any = jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    if (!user) return false;
    client.data.user = user;
    return true;
  }
}
