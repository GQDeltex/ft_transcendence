[backend](../README.md) / [Exports](../modules.md) / [users/users.service](../modules/users_users_service.md) / UsersService

# Class: UsersService

[users/users.service](../modules/users_users_service.md).UsersService

## Table of contents

### Constructors

- [constructor](users_users_service.UsersService.md#constructor)

### Properties

- [configService](users_users_service.UsersService.md#configservice)
- [httpService](users_users_service.UsersService.md#httpservice)
- [prcGateway](users_users_service.UsersService.md#prcgateway)
- [userRepository](users_users_service.UsersService.md#userrepository)

### Methods

- [checkValidOrderId](users_users_service.UsersService.md#checkvalidorderid)
- [create](users_users_service.UsersService.md#create)
- [findAll](users_users_service.UsersService.md#findall)
- [findChannelUser](users_users_service.UsersService.md#findchanneluser)
- [findOne](users_users_service.UsersService.md#findone)
- [findUserChannelList](users_users_service.UsersService.md#finduserchannellist)
- [update2FAEnable](users_users_service.UsersService.md#update2faenable)
- [update2FASecret](users_users_service.UsersService.md#update2fasecret)
- [updateBlocking](users_users_service.UsersService.md#updateblocking)
- [updateFriendship](users_users_service.UsersService.md#updatefriendship)
- [updateInventory](users_users_service.UsersService.md#updateinventory)
- [updatePicture](users_users_service.UsersService.md#updatepicture)
- [updateSocketId](users_users_service.UsersService.md#updatesocketid)
- [updateStatus](users_users_service.UsersService.md#updatestatus)
- [updateUsername](users_users_service.UsersService.md#updateusername)

## Constructors

### constructor

• **new UsersService**(`userRepository`, `prcGateway`, `configService`, `httpService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userRepository` | `Repository`<[`User`](users_entities_user_entity.User.md)\> |
| `prcGateway` | [`PrcGateway`](prc_prc_gateway.PrcGateway.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `httpService` | `HttpService` |

#### Defined in

[src/users/users.service.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L25)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/users/users.service.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L29)

___

### httpService

• `Private` `Readonly` **httpService**: `HttpService`

#### Defined in

[src/users/users.service.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L30)

___

### prcGateway

• `Private` `Readonly` **prcGateway**: [`PrcGateway`](prc_prc_gateway.PrcGateway.md)

#### Defined in

[src/users/users.service.ts:28](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L28)

___

### userRepository

• `Private` `Readonly` **userRepository**: `Repository`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L26)

## Methods

### checkValidOrderId

▸ `Private` **checkValidOrderId**(`id`, `orderId`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `orderId` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/users/users.service.ts:319](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L319)

___

### create

▸ **create**(`createUserInput`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `createUserInput` | [`CreateUserInput`](users_dto_create_user_input.CreateUserInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:33](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L33)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L107)

___

### findChannelUser

▸ **findChannelUser**(`identifier`, `channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/users/users.service.ts:78](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L78)

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

[src/users/users.service.ts:111](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L111)

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

[src/users/users.service.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L63)

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

[src/users/users.service.ts:99](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L99)

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

[src/users/users.service.ts:91](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L91)

___

### updateBlocking

▸ **updateBlocking**(`id`, `method`, `userId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `method` | [`AllowedUpdateBlockingMethod`](../enums/users_dto_update_blocking_input.AllowedUpdateBlockingMethod.md) |
| `userId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:263](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L263)

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

[src/users/users.service.ts:169](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L169)

___

### updateInventory

▸ **updateInventory**(`id`, `orderId`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `orderId` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:358](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L358)

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

[src/users/users.service.ts:120](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L120)

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

[src/users/users.service.ts:136](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L136)

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

[src/users/users.service.ts:151](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L151)

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

[src/users/users.service.ts:128](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L128)
