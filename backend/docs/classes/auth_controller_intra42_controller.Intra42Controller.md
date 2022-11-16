[backend](../README.md) / [Exports](../modules.md) / [auth/controller/intra42.controller](../modules/auth_controller_intra42_controller.md) / Intra42Controller

# Class: Intra42Controller

[auth/controller/intra42.controller](../modules/auth_controller_intra42_controller.md).Intra42Controller

## Table of contents

### Constructors

- [constructor](auth_controller_intra42_controller.Intra42Controller.md#constructor)

### Properties

- [httpService](auth_controller_intra42_controller.Intra42Controller.md#httpservice)
- [jwtService](auth_controller_intra42_controller.Intra42Controller.md#jwtservice)
- [usersService](auth_controller_intra42_controller.Intra42Controller.md#usersservice)

### Methods

- [callback](auth_controller_intra42_controller.Intra42Controller.md#callback)
- [fetchCoalition](auth_controller_intra42_controller.Intra42Controller.md#fetchcoalition)
- [login](auth_controller_intra42_controller.Intra42Controller.md#login)
- [logout](auth_controller_intra42_controller.Intra42Controller.md#logout)

## Constructors

### constructor

• **new Intra42Controller**(`jwtService`, `usersService`, `httpService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtService` | `JwtService` |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `httpService` | `HttpService` |

#### Defined in

[src/auth/controller/intra42.controller.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L22)

## Properties

### httpService

• `Private` `Readonly` **httpService**: `HttpService`

#### Defined in

[src/auth/controller/intra42.controller.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L25)

___

### jwtService

• `Private` `Readonly` **jwtService**: `JwtService`

#### Defined in

[src/auth/controller/intra42.controller.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L23)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/auth/controller/intra42.controller.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L24)

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

[src/auth/controller/intra42.controller.ts:34](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L34)

___

### fetchCoalition

▸ `Private` **fetchCoalition**(`userId`, `accessToken`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `accessToken` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/auth/controller/intra42.controller.ts:72](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L72)

___

### login

▸ **login**(): `void`

#### Returns

`void`

#### Defined in

[src/auth/controller/intra42.controller.ts:28](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L28)

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

[src/auth/controller/intra42.controller.ts:67](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/intra42.controller.ts#L67)
