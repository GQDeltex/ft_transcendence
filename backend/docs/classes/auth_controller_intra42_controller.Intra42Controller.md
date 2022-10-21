[backend](../README.md) / [Exports](../modules.md) / [auth/controller/intra42.controller](../modules/auth_controller_intra42_controller.md) / Intra42Controller

# Class: Intra42Controller

[auth/controller/intra42.controller](../modules/auth_controller_intra42_controller.md).Intra42Controller

## Table of contents

### Constructors

- [constructor](auth_controller_intra42_controller.Intra42Controller.md#constructor)

### Properties

- [jwtService](auth_controller_intra42_controller.Intra42Controller.md#jwtservice)
- [usersService](auth_controller_intra42_controller.Intra42Controller.md#usersservice)

### Methods

- [callback](auth_controller_intra42_controller.Intra42Controller.md#callback)
- [login](auth_controller_intra42_controller.Intra42Controller.md#login)
- [logout](auth_controller_intra42_controller.Intra42Controller.md#logout)

## Constructors

### constructor

• **new Intra42Controller**(`jwtService`, `usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtService` | `JwtService` |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/auth/controller/intra42.controller.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L19)

## Properties

### jwtService

• `Private` `Readonly` **jwtService**: `JwtService`

#### Defined in

[src/auth/controller/intra42.controller.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L20)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/auth/controller/intra42.controller.ts:21](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L21)

## Methods

### callback

▸ **callback**(`req`, `res`): `Promise`<{ `isAuthenticated`: `boolean` = !user.twoFAEnable }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<{ `isAuthenticated`: `boolean` = !user.twoFAEnable }\>

#### Defined in

[src/auth/controller/intra42.controller.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L30)

___

### login

▸ **login**(): `void`

#### Returns

`void`

#### Defined in

[src/auth/controller/intra42.controller.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L24)

___

### logout

▸ **logout**(`res`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`void`

#### Defined in

[src/auth/controller/intra42.controller.ts:58](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/controller/intra42.controller.ts#L58)
