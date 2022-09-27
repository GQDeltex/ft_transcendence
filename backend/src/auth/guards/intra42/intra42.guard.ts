import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Intra42OAuthGuard extends AuthGuard('intra42') {}
