import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { ApolloError } from 'apollo-server-express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { TokenExpiredError } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return exception;
  }
}

@Catch(TypeORMError)
export class TypeORMErrorFilter implements GqlExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return exception;
  }
}

// To suppress nestjs from logging ApolloError and WsException
// https://github.com/nestjs/graphql/issues/2060
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown): any {
    if (exception instanceof ApolloError) throw exception;
    if (exception instanceof WsException) throw exception;
    return exception;
  }
}

@Catch(WsException, EntityNotFoundError, TokenExpiredError, BadRequestException)
export class CustomPrcExceptionFilter extends BaseWsExceptionFilter {
  catch(
    exception:
      | WsException
      | EntityNotFoundError
      | TokenExpiredError
      | BadRequestException,
    host: ArgumentsHost,
  ) {
    // For some reason this throws an 'Error' again?
    //super.catch(exception, host);
    const client = host.switchToWs().getClient<Socket>();
    client.emit('exception', { status: 'error', message: exception.message });
  }
}
