[backend](../README.md) / [Exports](../modules.md) / [auth/guard/wsJwt.guard](../modules/auth_guard_wsJwt_guard.md) / WsJwt2FAAuthGuard

# Class: WsJwt2FAAuthGuard

[auth/guard/wsJwt.guard](../modules/auth_guard_wsJwt_guard.md).WsJwt2FAAuthGuard

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](auth_guard_wsJwt_guard.WsJwt2FAAuthGuard.md#constructor)

### Properties

- [configService](auth_guard_wsJwt_guard.WsJwt2FAAuthGuard.md#configservice)

### Methods

- [canActivate](auth_guard_wsJwt_guard.WsJwt2FAAuthGuard.md#canactivate)

## Constructors

### constructor

• **new WsJwt2FAAuthGuard**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Defined in

src/auth/guard/wsJwt.guard.ts:8

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

src/auth/guard/wsJwt.guard.ts:8

## Methods

### canActivate

▸ **canActivate**(`context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`boolean`

#### Implementation of

CanActivate.canActivate

#### Defined in

src/auth/guard/wsJwt.guard.ts:10
