import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { TypeORMError } from 'typeorm';

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

// To suppress nestjs from logging ApolloError
// https://github.com/nestjs/graphql/issues/2060
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown): any {
    if (exception instanceof ApolloError) throw exception;
    return exception;
  }
}
