[backend](../README.md) / [Exports](../modules.md) / [auth/controller/twoFA.controller](../modules/auth_controller_twoFA_controller.md) / TwoFAController

# Class: TwoFAController

[auth/controller/twoFA.controller](../modules/auth_controller_twoFA_controller.md).TwoFAController

## Table of contents

### Constructors

- [constructor](auth_controller_twoFA_controller.TwoFAController.md#constructor)

### Properties

- [jwtService](auth_controller_twoFA_controller.TwoFAController.md#jwtservice)
- [twoFAService](auth_controller_twoFA_controller.TwoFAController.md#twofaservice)

### Methods

- [disable](auth_controller_twoFA_controller.TwoFAController.md#disable)
- [enable](auth_controller_twoFA_controller.TwoFAController.md#enable)
- [generate](auth_controller_twoFA_controller.TwoFAController.md#generate)
- [verify](auth_controller_twoFA_controller.TwoFAController.md#verify)

## Constructors

### constructor

• **new TwoFAController**(`twoFAService`, `jwtService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `twoFAService` | [`TwoFAService`](auth_service_twoFA_service.TwoFAService.md) |
| `jwtService` | `JwtService` |

#### Defined in

[src/auth/controller/twoFA.controller.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L22)

## Properties

### jwtService

• `Private` `Readonly` **jwtService**: `JwtService`

#### Defined in

[src/auth/controller/twoFA.controller.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L24)

___

### twoFAService

• `Private` `Readonly` **twoFAService**: [`TwoFAService`](auth_service_twoFA_service.TwoFAService.md)

#### Defined in

[src/auth/controller/twoFA.controller.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L23)

## Methods

### disable

▸ **disable**(`req`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/controller/twoFA.controller.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L81)

___

### enable

▸ **enable**(`req`, `code`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |
| `code` | ``null`` \| `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/controller/twoFA.controller.ts:41](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L41)

___

### generate

▸ **generate**(`req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/controller/twoFA.controller.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L27)

___

### verify

▸ **verify**(`req`, `res`, `code`): `Promise`<{ `isAuthenticated`: `boolean` = true }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `any` |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `code` | ``null`` \| `string` |

#### Returns

`Promise`<{ `isAuthenticated`: `boolean` = true }\>

#### Defined in

[src/auth/controller/twoFA.controller.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/controller/twoFA.controller.ts#L55)
