[backend](../README.md) / [Exports](../modules.md) / [prc/prc.gateway](../modules/prc_prc_gateway.md) / CustomPrcExceptionFilter

# Class: CustomPrcExceptionFilter

[prc/prc.gateway](../modules/prc_prc_gateway.md).CustomPrcExceptionFilter

## Hierarchy

- `BaseWsExceptionFilter`

  ↳ **`CustomPrcExceptionFilter`**

## Table of contents

### Constructors

- [constructor](prc_prc_gateway.CustomPrcExceptionFilter.md#constructor)

### Methods

- [catch](prc_prc_gateway.CustomPrcExceptionFilter.md#catch)
- [handleError](prc_prc_gateway.CustomPrcExceptionFilter.md#handleerror)
- [handleUnknownError](prc_prc_gateway.CustomPrcExceptionFilter.md#handleunknownerror)
- [isExceptionObject](prc_prc_gateway.CustomPrcExceptionFilter.md#isexceptionobject)

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
| `exception` | `WsException` \| `EntityNotFoundError` \| `BadRequestException` \| `TokenExpiredError` |
| `host` | `ArgumentsHost` |

#### Returns

`void`

#### Overrides

BaseWsExceptionFilter.catch

#### Defined in

[src/prc/prc.gateway.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L52)

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
