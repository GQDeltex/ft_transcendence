[backend](../README.md) / [Exports](../modules.md) / [users/users.service](../modules/users_users_service.md) / UsersService

# Class: UsersService

[users/users.service](../modules/users_users_service.md).UsersService

## Table of contents

### Constructors

- [constructor](users_users_service.UsersService.md#constructor)

### Properties

- [configService](users_users_service.UsersService.md#configservice)
- [gameRepository](users_users_service.UsersService.md#gamerepository)
- [httpService](users_users_service.UsersService.md#httpservice)
- [prcGateway](users_users_service.UsersService.md#prcgateway)
- [userRepository](users_users_service.UsersService.md#userrepository)

### Methods

- [checkValidOrderId](users_users_service.UsersService.md#checkvalidorderid)
- [create](users_users_service.UsersService.md#create)
- [findAll](users_users_service.UsersService.md#findall)
- [findLeaders](users_users_service.UsersService.md#findleaders)
- [findOne](users_users_service.UsersService.md#findone)
- [findRank](users_users_service.UsersService.md#findrank)
- [findSocketUser](users_users_service.UsersService.md#findsocketuser)
- [findUserChannelList](users_users_service.UsersService.md#finduserchannellist)
- [update2FAEnable](users_users_service.UsersService.md#update2faenable)
- [update2FASecret](users_users_service.UsersService.md#update2fasecret)
- [updateBlocking](users_users_service.UsersService.md#updateblocking)
- [updateEquippedItems](users_users_service.UsersService.md#updateequippeditems)
- [updateFriendship](users_users_service.UsersService.md#updatefriendship)
- [updateGameRequest](users_users_service.UsersService.md#updategamerequest)
- [updateInventory](users_users_service.UsersService.md#updateinventory)
- [updatePicture](users_users_service.UsersService.md#updatepicture)
- [updateSocketId](users_users_service.UsersService.md#updatesocketid)
- [updateStatus](users_users_service.UsersService.md#updatestatus)
- [updateTitle](users_users_service.UsersService.md#updatetitle)
- [updateUsername](users_users_service.UsersService.md#updateusername)

## Constructors

### constructor

• **new UsersService**(`userRepository`, `prcGateway`, `configService`, `httpService`, `gameRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userRepository` | `Repository`<[`User`](users_entities_user_entity.User.md)\> |
| `prcGateway` | [`PrcGateway`](prc_prc_gateway.PrcGateway.md) |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |
| `httpService` | `HttpService` |
| `gameRepository` | `Repository`<[`Game`](game_entities_game_entity.Game.md)\> |

#### Defined in

[src/users/users.service.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L37)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/users/users.service.ts:41](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L41)

___

### gameRepository

• `Private` `Readonly` **gameRepository**: `Repository`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/users/users.service.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L43)

___

### httpService

• `Private` `Readonly` **httpService**: `HttpService`

#### Defined in

[src/users/users.service.ts:42](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L42)

___

### prcGateway

• `Private` `Readonly` **prcGateway**: [`PrcGateway`](prc_prc_gateway.PrcGateway.md)

#### Defined in

[src/users/users.service.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L40)

___

### userRepository

• `Private` `Readonly` **userRepository**: `Repository`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L38)

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

[src/users/users.service.ts:351](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L351)

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

[src/users/users.service.ts:46](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L46)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:120](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L120)

___

### findLeaders

▸ **findLeaders**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.service.ts:91](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L91)

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

[src/users/users.service.ts:124](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L124)

___

### findRank

▸ **findRank**(`user`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/users/users.service.ts:512](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L512)

___

### findSocketUser

▸ **findSocketUser**(`socketId`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socketId` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.service.ts:98](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L98)

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

[src/users/users.service.ts:76](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L76)

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

[src/users/users.service.ts:112](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L112)

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

[src/users/users.service.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L104)

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

[src/users/users.service.ts:282](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L282)

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

[src/users/users.service.ts:400](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L400)

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

[src/users/users.service.ts:188](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L188)

___

### updateGameRequest

▸ **updateGameRequest**(`id`, `input`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `input` | [`UpdateGameRequestInput`](users_dto_update_gamerequest_input.UpdateGameRequestInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:421](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L421)

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

[src/users/users.service.ts:390](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L390)

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

[src/users/users.service.ts:133](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L133)

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

[src/users/users.service.ts:155](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L155)

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

[src/users/users.service.ts:170](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L170)

___

### updateTitle

▸ **updateTitle**(`id`, `title`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `title` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/users/users.service.ts:149](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L149)

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

[src/users/users.service.ts:141](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.service.ts#L141)
