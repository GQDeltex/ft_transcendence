[backend](../README.md) / [Exports](../modules.md) / [users/decorator/user-pipe.service](../modules/users_decorator_user_pipe_service.md) / UserPipe

# Class: UserPipe

[users/decorator/user-pipe.service](../modules/users_decorator_user_pipe_service.md).UserPipe

## Implements

- `PipeTransform`

## Table of contents

### Constructors

- [constructor](users_decorator_user_pipe_service.UserPipe.md#constructor)

### Properties

- [usersService](users_decorator_user_pipe_service.UserPipe.md#usersservice)

### Methods

- [transform](users_decorator_user_pipe_service.UserPipe.md#transform)

## Constructors

### constructor

• **new UserPipe**(`usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/users/decorator/user-pipe.service.ts:7](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/decorator/user-pipe.service.ts#L7)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/decorator/user-pipe.service.ts:7](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/decorator/user-pipe.service.ts#L7)

## Methods

### transform

▸ **transform**(`jwtPayload`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Implementation of

PipeTransform.transform

#### Defined in

[src/users/decorator/user-pipe.service.ts:9](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/decorator/user-pipe.service.ts#L9)
