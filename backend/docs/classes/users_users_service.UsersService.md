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
- [findLeaders](users_users_service.UsersService.md#findleaders)
- [findOne](users_users_service.UsersService.md#findone)
- [findUserChannelList](users_users_service.UsersService.md#finduserchannellist)
- [update2FAEnable](users_users_service.UsersService.md#update2faenable)
- [update2FASecret](users_users_service.UsersService.md#update2fasecret)
- [updateBlocking](users_users_service.UsersService.md#updateblocking)
- [updateEquippedItems](users_users_service.UsersService.md#updateequippeditems)
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

[src/users/users.service.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L29)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/users/users.service.ts:33](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L33)

___

### httpService

• `Private` `Readonly` **httpService**: `HttpService`

#### Defined in

[src/users/users.service.ts:34](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L34)

___

### prcGateway

• `Private` `Readonly` **prcGateway**: [`PrcGateway`](prc_prc_gateway.PrcGateway.md)

#### Defined in

[src/users/users.service.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L32)

___

### userRepository

• `Private` `Readonly` **userRepository**: `Repository`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L30)

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

[src/users/users.service.ts:330](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L330)

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

[src/users/users.service.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L37)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:118](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L118)

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

[src/users/users.service.ts:82](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L82)

___

### findLeaders

▸ **findLeaders**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:95](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L95)

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

[src/users/users.service.ts:122](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L122)

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

[src/users/users.service.ts:67](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L67)

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

[src/users/users.service.ts:110](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L110)

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

[src/users/users.service.ts:102](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L102)

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

[src/users/users.service.ts:274](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L274)

___

### updateEquippedItems

▸ **updateEquippedItems**(`id`, `input`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `input` | [`UpdateUserEquippedItemsInput`](users_dto_update_equipped_items_input.UpdateUserEquippedItemsInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:379](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L379)

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

[src/users/users.service.ts:180](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L180)

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

[src/users/users.service.ts:369](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L369)

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

[src/users/users.service.ts:131](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L131)

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

[src/users/users.service.ts:147](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L147)

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

[src/users/users.service.ts:162](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L162)

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

[src/users/users.service.ts:139](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L139)
