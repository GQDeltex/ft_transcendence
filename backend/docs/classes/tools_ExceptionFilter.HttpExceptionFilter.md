[backend](../README.md) / [Exports](../modules.md) / [tools/ExceptionFilter](../modules/tools_ExceptionFilter.md) / HttpExceptionFilter

# Class: HttpExceptionFilter

[tools/ExceptionFilter](../modules/tools_ExceptionFilter.md).HttpExceptionFilter

## Implements

- `GqlExceptionFilter`

## Table of contents

### Constructors

- [constructor](tools_ExceptionFilter.HttpExceptionFilter.md#constructor)

### Methods

- [catch](tools_ExceptionFilter.HttpExceptionFilter.md#catch)

## Constructors

### constructor

• **new HttpExceptionFilter**()

## Methods

### catch

▸ **catch**(`exception`, `host`): `HttpException`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `HttpException` |
| `host` | `ArgumentsHost` |

#### Returns

`HttpException`

#### Implementation of

GqlExceptionFilter.catch

#### Defined in

src/tools/ExceptionFilter.ts:13
