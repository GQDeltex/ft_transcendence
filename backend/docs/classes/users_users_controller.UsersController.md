[backend](../README.md) / [Exports](../modules.md) / [users/users.controller](../modules/users_users_controller.md) / UsersController

# Class: UsersController

[users/users.controller](../modules/users_users_controller.md).UsersController

## Table of contents

### Constructors

- [constructor](users_users_controller.UsersController.md#constructor)

### Properties

- [configService](users_users_controller.UsersController.md#configservice)
- [usersService](users_users_controller.UsersController.md#usersservice)

### Methods

- [uploadFile](users_users_controller.UsersController.md#uploadfile)

## Constructors

### constructor

• **new UsersController**(`usersService`, `configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Defined in

[src/users/users.controller.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.controller.ts#L22)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/users/users.controller.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.controller.ts#L24)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.controller.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.controller.ts#L23)

## Methods

### uploadFile

▸ **uploadFile**(`file`, `payload`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `payload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.controller.ts:33](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.controller.ts#L33)
