[backend](../README.md) / [Exports](../modules.md) / [tools/ExceptionFilter](../modules/tools_ExceptionFilter.md) / TypeORMErrorFilter

# Class: TypeORMErrorFilter

[tools/ExceptionFilter](../modules/tools_ExceptionFilter.md).TypeORMErrorFilter

## Implements

- `GqlExceptionFilter`

## Table of contents

### Constructors

- [constructor](tools_ExceptionFilter.TypeORMErrorFilter.md#constructor)

### Methods

- [catch](tools_ExceptionFilter.TypeORMErrorFilter.md#catch)

## Constructors

### constructor

• **new TypeORMErrorFilter**()

## Methods

### catch

▸ **catch**(`exception`, `host`): `TypeORMError`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `TypeORMError` |
| `host` | `ArgumentsHost` |

#### Returns

`TypeORMError`

#### Implementation of

GqlExceptionFilter.catch

#### Defined in

[src/tools/ExceptionFilter.ts:21](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/tools/ExceptionFilter.ts#L21)
