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
- [receivedFriendRequests](users_users_resolver.UsersResolver.md#receivedfriendrequests)
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
- [status](users_users_resolver.UsersResolver.md#status)
- [updateBlocking](users_users_resolver.UsersResolver.md#updateblocking)
- [updateEquippedItems](users_users_resolver.UsersResolver.md#updateequippeditems)
- [updateFriendship](users_users_resolver.UsersResolver.md#updatefriendship)
- [updateInventory](users_users_resolver.UsersResolver.md#updateinventory)
- [updateUsername](users_users_resolver.UsersResolver.md#updateusername)

## Constructors

### constructor

• **new UsersResolver**(`usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/users/users.resolver.ts:28](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L28)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:28](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L28)

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

[src/users/users.resolver.ts:156](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L156)

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

[src/users/users.resolver.ts:151](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L151)

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

[src/users/users.resolver.ts:161](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L161)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L30)

___

### findLeaders

▸ **findLeaders**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L55)

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

[src/users/users.resolver.ts:35](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L35)

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

[src/users/users.resolver.ts:45](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L45)

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

[src/users/users.resolver.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L50)

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

[src/users/users.resolver.ts:136](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L136)

___

### getItems

▸ **getItems**(): [`Item`](users_entities_item_entity.Item.md)[]

#### Returns

[`Item`](users_entities_item_entity.Item.md)[]

#### Defined in

[src/users/users.resolver.ts:98](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L98)

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

[src/users/users.resolver.ts:146](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L146)

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

[src/users/users.resolver.ts:141](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L141)

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

[src/users/users.resolver.ts:122](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L122)

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

[src/users/users.resolver.ts:85](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L85)

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

[src/users/users.resolver.ts:111](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L111)

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

[src/users/users.resolver.ts:72](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L72)

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

[src/users/users.resolver.ts:103](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L103)

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

[src/users/users.resolver.ts:60](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L60)
