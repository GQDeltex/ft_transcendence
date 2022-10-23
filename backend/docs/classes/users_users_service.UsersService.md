[backend](../README.md) / [Exports](../modules.md) / [users/users.service](../modules/users_users_service.md) / UsersService

# Class: UsersService

[users/users.service](../modules/users_users_service.md).UsersService

## Table of contents

### Constructors

- [constructor](users_users_service.UsersService.md#constructor)

### Properties

- [prcGateway](users_users_service.UsersService.md#prcgateway)
- [userRepository](users_users_service.UsersService.md#userrepository)

### Methods

- [create](users_users_service.UsersService.md#create)
- [findAll](users_users_service.UsersService.md#findall)
- [findChannelUser](users_users_service.UsersService.md#findchanneluser)
- [findOne](users_users_service.UsersService.md#findone)
- [findUserChannelList](users_users_service.UsersService.md#finduserchannellist)
- [isInChannel](users_users_service.UsersService.md#isinchannel)
- [update2FAEnable](users_users_service.UsersService.md#update2faenable)
- [update2FASecret](users_users_service.UsersService.md#update2fasecret)
- [updateFriendship](users_users_service.UsersService.md#updatefriendship)
- [updatePicture](users_users_service.UsersService.md#updatepicture)
- [updateSocketId](users_users_service.UsersService.md#updatesocketid)
- [updateStatus](users_users_service.UsersService.md#updatestatus)
- [updateUsername](users_users_service.UsersService.md#updateusername)

## Constructors

### constructor

• **new UsersService**(`userRepository`, `prcGateway`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userRepository` | `Repository`<[`User`](users_entities_user_entity.User.md)\> |
| `prcGateway` | [`PrcGateway`](prc_prc_gateway.PrcGateway.md) |

#### Defined in

[src/users/users.service.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L12)

## Properties

### prcGateway

• `Private` `Readonly` **prcGateway**: [`PrcGateway`](prc_prc_gateway.PrcGateway.md)

#### Defined in

[src/users/users.service.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L15)

___

### userRepository

• `Private` `Readonly` **userRepository**: `Repository`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L14)

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

[src/users/users.service.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L18)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:72](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L72)

___

### findChannelUser

▸ **findChannelUser**(`identifier`, `channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channeluser_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channeluser_entity.ChannelUser.md)\>

#### Defined in

[src/users/users.service.ts:34](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L34)

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

[src/users/users.service.ts:76](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L76)

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

[src/users/users.service.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L22)

___

### isInChannel

▸ **isInChannel**(`user`, `channel_name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |
| `channel_name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/users/users.service.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L48)

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

[src/users/users.service.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L64)

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

[src/users/users.service.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L56)

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

[src/users/users.service.ts:138](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L138)

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

[src/users/users.service.ts:90](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L90)

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

[src/users/users.service.ts:106](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L106)

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

[src/users/users.service.ts:121](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L121)

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

[src/users/users.service.ts:98](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L98)
