import { Injectable, ExecutionContext, ContextType } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | 'graphql'>() === 'graphql')
      return GqlExecutionContext.create(context).getContext().req;

    return context.switchToHttp().getRequest();
  }
}
