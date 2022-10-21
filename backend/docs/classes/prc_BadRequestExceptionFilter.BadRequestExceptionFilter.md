[backend](../README.md) / [Exports](../modules.md) / [prc/BadRequestExceptionFilter](../modules/prc_BadRequestExceptionFilter.md) / BadRequestExceptionFilter

# Class: BadRequestExceptionFilter

[prc/BadRequestExceptionFilter](../modules/prc_BadRequestExceptionFilter.md).BadRequestExceptionFilter

## Hierarchy

- `BaseWsExceptionFilter`

  ↳ **`BadRequestExceptionFilter`**

## Table of contents

### Constructors

- [constructor](prc_BadRequestExceptionFilter.BadRequestExceptionFilter.md#constructor)

### Methods

- [catch](prc_BadRequestExceptionFilter.BadRequestExceptionFilter.md#catch)
- [handleError](prc_BadRequestExceptionFilter.BadRequestExceptionFilter.md#handleerror)
- [handleUnknownError](prc_BadRequestExceptionFilter.BadRequestExceptionFilter.md#handleunknownerror)
- [isExceptionObject](prc_BadRequestExceptionFilter.BadRequestExceptionFilter.md#isexceptionobject)

## Constructors

### constructor

• **new BadRequestExceptionFilter**()

#### Inherited from

BaseWsExceptionFilter.constructor

## Methods

### catch

▸ **catch**(`exception`, `host`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exception` | `BadRequestException` |
| `host` | `ArgumentsHost` |

#### Returns

`void`

#### Overrides

BaseWsExceptionFilter.catch

#### Defined in

src/prc/BadRequestExceptionFilter.ts:6

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
