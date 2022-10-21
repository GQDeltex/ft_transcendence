[backend](../README.md) / [Exports](../modules.md) / [auth/service/twoFA.service](../modules/auth_service_twoFA_service.md) / TwoFAService

# Class: TwoFAService

[auth/service/twoFA.service](../modules/auth_service_twoFA_service.md).TwoFAService

## Table of contents

### Constructors

- [constructor](auth_service_twoFA_service.TwoFAService.md#constructor)

### Properties

- [usersService](auth_service_twoFA_service.TwoFAService.md#usersservice)

### Methods

- [disable2FA](auth_service_twoFA_service.TwoFAService.md#disable2fa)
- [enable2FA](auth_service_twoFA_service.TwoFAService.md#enable2fa)
- [generate2FASecret](auth_service_twoFA_service.TwoFAService.md#generate2fasecret)
- [pipeQrCodeStream](auth_service_twoFA_service.TwoFAService.md#pipeqrcodestream)
- [verify2FA](auth_service_twoFA_service.TwoFAService.md#verify2fa)

## Constructors

### constructor

• **new TwoFAService**(`usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/auth/service/twoFA.service.ts:10](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L10)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/auth/service/twoFA.service.ts:10](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L10)

## Methods

### disable2FA

▸ **disable2FA**(`userId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/service/twoFA.service.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L56)

___

### enable2FA

▸ **enable2FA**(`userId`, `code`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `code` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/service/twoFA.service.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L31)

___

### generate2FASecret

▸ **generate2FASecret**(`userId`, `userEmail`): `Promise`<{ `otpauthUrl`: `string` ; `secret`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `userEmail` | `string` |

#### Returns

`Promise`<{ `otpauthUrl`: `string` ; `secret`: `string`  }\>

#### Defined in

[src/auth/service/twoFA.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L12)

___

### pipeQrCodeStream

▸ **pipeQrCodeStream**(`stream`, `otpauthUrl`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `otpauthUrl` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/service/twoFA.service.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L27)

___

### verify2FA

▸ **verify2FA**(`userId`, `code`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `code` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/service/twoFA.service.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/service/twoFA.service.ts#L44)
