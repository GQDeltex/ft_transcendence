[backend](../README.md) / [Exports](../modules.md) / [tools/ExceptionFilter](../modules/tools_ExceptionFilter.md) / CustomPrcExceptionFilter

# Class: CustomPrcExceptionFilter

[tools/ExceptionFilter](../modules/tools_ExceptionFilter.md).CustomPrcExceptionFilter

## Hierarchy

- `BaseWsExceptionFilter`

  ↳ **`CustomPrcExceptionFilter`**

## Table of contents

### Constructors

- [constructor](tools_ExceptionFilter.CustomPrcExceptionFilter.md#constructor)

### Methods

- [catch](tools_ExceptionFilter.CustomPrcExceptionFilter.md#catch)
- [handleError](tools_ExceptionFilter.CustomPrcExceptionFilter.md#handleerror)
- [handleUnknownError](tools_ExceptionFilter.CustomPrcExceptionFilter.md#handleunknownerror)
- [isExceptionObject](tools_ExceptionFilter.CustomPrcExceptionFilter.md#isexceptionobject)

## Constructors

### constructor

• **new CustomPrcExceptionFilter**()

#### Inherited from

BaseWsExceptionFilter.constructor

## Methods

### catch

▸ **catch**(`exception`, `host`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `WsException` \| `EntityNotFoundError` \| `TokenExpiredError` \| `BadRequestException` |
| `host` | `ArgumentsHost` |

#### Returns

`void`

#### Overrides

BaseWsExceptionFilter.catch

#### Defined in

[src/tools/ExceptionFilter.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/ExceptionFilter.ts#L43)

___

### handleError

▸ **handleError**<`TClient`\>(`client`, `exception`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TClient` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `TClient` |
| `exception` | `any` |

#### Returns

`void`

#### Inherited from

BaseWsExceptionFilter.handleError

#### Defined in

node_modules/@nestjs/websockets/exceptions/base-ws-exception-filter.d.ts:5

___

### handleUnknownError

▸ **handleUnknownError**<`TClient`\>(`exception`, `client`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TClient` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `any` |
| `client` | `TClient` |

#### Returns

`void`

#### Inherited from

BaseWsExceptionFilter.handleUnknownError

#### Defined in

node_modules/@nestjs/websockets/exceptions/base-ws-exception-filter.d.ts:8

___

### isExceptionObject

▸ **isExceptionObject**(`err`): err is Error

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

#### Returns

err is Error

#### Inherited from

BaseWsExceptionFilter.isExceptionObject

#### Defined in

node_modules/@nestjs/websockets/exceptions/base-ws-exception-filter.d.ts:11
