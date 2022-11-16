[backend](../README.md) / [Exports](../modules.md) / [users/users.resolver](../modules/users_users_resolver.md) / UsersResolver

# Class: UsersResolver

[users/users.resolver](../modules/users_users_resolver.md).UsersResolver

## Table of contents

### Constructors

- [constructor](users_users_resolver.UsersResolver.md#constructor)

### Properties

- [usersService](users_users_resolver.UsersResolver.md#usersservice)

### Methods

- [blockedBy](users_users_resolver.UsersResolver.md#blockedby)
- [blocks](users_users_resolver.UsersResolver.md#blocks)
- [equipped](users_users_resolver.UsersResolver.md#equipped)
- [findAll](users_users_resolver.UsersResolver.md#findall)
- [findLeaders](users_users_resolver.UsersResolver.md#findleaders)
- [findOneById](users_users_resolver.UsersResolver.md#findonebyid)
- [findOneByUsername](users_users_resolver.UsersResolver.md#findonebyusername)
- [findUserChannelList](users_users_resolver.UsersResolver.md#finduserchannellist)
- [friends](users_users_resolver.UsersResolver.md#friends)
- [getItems](users_users_resolver.UsersResolver.md#getitems)
- [rank](users_users_resolver.UsersResolver.md#rank)
- [receivedFriendRequests](users_users_resolver.UsersResolver.md#receivedfriendrequests)
- [resetPicture](users_users_resolver.UsersResolver.md#resetpicture)
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
- [status](users_users_resolver.UsersResolver.md#status)
- [updateBlocking](users_users_resolver.UsersResolver.md#updateblocking)
- [updateEquippedItems](users_users_resolver.UsersResolver.md#updateequippeditems)
- [updateFriendship](users_users_resolver.UsersResolver.md#updatefriendship)
- [updateGameRequest](users_users_resolver.UsersResolver.md#updategamerequest)
- [updateInventory](users_users_resolver.UsersResolver.md#updateinventory)
- [updateTitle](users_users_resolver.UsersResolver.md#updatetitle)
- [updateUsername](users_users_resolver.UsersResolver.md#updateusername)

## Constructors

### constructor

• **new UsersResolver**(`usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/users/users.resolver.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L30)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L30)

## Methods

### blockedBy

▸ **blockedBy**(`user`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/users/users.resolver.ts:191](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L191)

___

### blocks

▸ **blocks**(`user`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/users/users.resolver.ts:186](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L186)

___

### equipped

▸ **equipped**(`user`): `Promise`<[`Item`](users_entities_item_entity.Item.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Item`](users_entities_item_entity.Item.md)[]\>

#### Defined in

[src/users/users.resolver.ts:196](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L196)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L32)

___

### findLeaders

▸ **findLeaders**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:57](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L57)

___

### findOneById

▸ **findOneById**(`id`, `jwtPayload`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `undefined` \| `number` |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L37)

___

### findOneByUsername

▸ **findOneByUsername**(`username`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:47](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L47)

___

### findUserChannelList

▸ **findUserChannelList**(`username`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L52)

___

### friends

▸ **friends**(`user`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/users/users.resolver.ts:171](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L171)

___

### getItems

▸ **getItems**(): [`Item`](users_entities_item_entity.Item.md)[]

#### Returns

[`Item`](users_entities_item_entity.Item.md)[]

#### Defined in

[src/users/users.resolver.ts:109](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L109)

___

### rank

▸ **rank**(`user`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/users/users.resolver.ts:166](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L166)

___

### receivedFriendRequests

▸ **receivedFriendRequests**(`user`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/users/users.resolver.ts:181](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L181)

___

### resetPicture

▸ **resetPicture**(`user`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:145](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L145)

___

### sentFriendRequests

▸ **sentFriendRequests**(`user`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[src/users/users.resolver.ts:176](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L176)

___

### status

▸ **status**(`jwtPayload`, `user`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/users/users.resolver.ts:152](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L152)

___

### updateBlocking

▸ **updateBlocking**(`jwtPayload`, `args`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `args` | [`UpdateUserBlockingInput`](users_dto_update_blocking_input.UpdateUserBlockingInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:96](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L96)

___

### updateEquippedItems

▸ **updateEquippedItems**(`jwtPayload`, `updateUserEquippedItemsInput`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `updateUserEquippedItemsInput` | [`UpdateUserEquippedItemsInput`](users_dto_update_equipped_items_input.UpdateUserEquippedItemsInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:122](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L122)

___

### updateFriendship

▸ **updateFriendship**(`jwtPayload`, `args`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `args` | [`UpdateUserFriendshipInput`](users_dto_update_friendship_input.UpdateUserFriendshipInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:83](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L83)

___

### updateGameRequest

▸ **updateGameRequest**(`jwtPayload`, `updateGameRequestInput`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `updateGameRequestInput` | [`UpdateGameRequestInput`](users_dto_update_gamerequest_input.UpdateGameRequestInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:133](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L133)

___

### updateInventory

▸ **updateInventory**(`jwtPayload`, `orderId`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `orderId` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:114](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L114)

___

### updateTitle

▸ **updateTitle**(`jwtPayload`, `updateTitleInput`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `updateTitleInput` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:74](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L74)

___

### updateUsername

▸ **updateUsername**(`jwtPayload`, `updateUserUsernameInput`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `updateUserUsernameInput` | [`UpdateUsernameInput`](users_dto_update_username_input.UpdateUsernameInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:62](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L62)
