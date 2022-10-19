import {
  ContextType,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    let request;
    if (ctx.getType<ContextType | 'graphql'>() === 'graphql') {
      request = GqlExecutionContext.create(ctx).getContext().req;
    } else {
      request = ctx.switchToHttp().getRequest();
    }
    return request.user;
  },
);
