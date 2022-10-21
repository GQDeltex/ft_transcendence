[backend](../README.md) / [Exports](../modules.md) / [users/users.service](../modules/users_users_service.md) / UsersService

# Class: UsersService

[users/users.service](../modules/users_users_service.md).UsersService

## Table of contents

### Constructors

- [constructor](users_users_service.UsersService.md#constructor)

### Properties

- [userRepository](users_users_service.UsersService.md#userrepository)

### Methods

- [create](users_users_service.UsersService.md#create)
- [findAll](users_users_service.UsersService.md#findall)
- [findOne](users_users_service.UsersService.md#findone)
- [findUserChannelList](users_users_service.UsersService.md#finduserchannellist)
- [update2FAEnable](users_users_service.UsersService.md#update2faenable)
- [update2FASecret](users_users_service.UsersService.md#update2fasecret)
- [updateFriendship](users_users_service.UsersService.md#updatefriendship)
- [updatePicture](users_users_service.UsersService.md#updatepicture)
- [updateSocketId](users_users_service.UsersService.md#updatesocketid)
- [updateStatus](users_users_service.UsersService.md#updatestatus)
- [updateUsername](users_users_service.UsersService.md#updateusername)

## Constructors

### constructor

• **new UsersService**(`userRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userRepository` | `Repository`<[`User`](users_entities_user_entity.User.md)\> |

#### Defined in

[src/users/users.service.ts:11](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L11)

## Properties

### userRepository

• `Private` `Readonly` **userRepository**: `Repository`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L12)

## Methods

### create

▸ **create**(`createUserInput`): `Promise`<`InsertResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `createUserInput` | [`CreateUserInput`](users_dto_create_user_input.CreateUserInput.md) |

#### Returns

`Promise`<`InsertResult`\>

#### Defined in

[src/users/users.service.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L15)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L48)

___

### findOne

▸ **findOne**(`identifier`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L52)

___

### findUserChannelList

▸ **findUserChannelList**(`identifier`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L19)

___

### update2FAEnable

▸ **update2FAEnable**(`id`, `enabled`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `enabled` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L40)

___

### update2FASecret

▸ **update2FASecret**(`id`, `secret`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `secret` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L32)

___

### updateFriendship

▸ **updateFriendship**(`id`, `method`, `friendId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `method` | [`AllowedUpdateFriendshipMethod`](../enums/users_dto_update_friendship_input.AllowedUpdateFriendshipMethod.md) |
| `friendId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:114](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L114)

___

### updatePicture

▸ **updatePicture**(`id`, `picture`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `picture` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:66](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L66)

___

### updateSocketId

▸ **updateSocketId**(`identification`, `socketId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identification` | `string` \| `number` |
| `socketId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:82](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L82)

___

### updateStatus

▸ **updateStatus**(`identification`, `status`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identification` | `string` \| `number` |
| `status` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:97](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L97)

___

### updateUsername

▸ **updateUsername**(`id`, `username`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `username` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:74](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/users/users.service.ts#L74)
