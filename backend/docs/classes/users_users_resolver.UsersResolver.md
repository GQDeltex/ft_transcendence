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
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
- [status](users_users_resolver.UsersResolver.md#status)
- [updateBlocking](users_users_resolver.UsersResolver.md#updateblocking)
- [updateEquippedItems](users_users_resolver.UsersResolver.md#updateequippeditems)
- [updateFriendship](users_users_resolver.UsersResolver.md#updatefriendship)
- [updateGameRequest](users_users_resolver.UsersResolver.md#updategamerequest)
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

[src/users/users.resolver.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L29)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L29)

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

[src/users/users.resolver.ts:174](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L174)

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

[src/users/users.resolver.ts:169](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L169)

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

[src/users/users.resolver.ts:179](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L179)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L31)

___

### findLeaders

▸ **findLeaders**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L56)

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

[src/users/users.resolver.ts:36](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L36)

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

[src/users/users.resolver.ts:46](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L46)

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

[src/users/users.resolver.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L51)

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

[src/users/users.resolver.ts:154](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L154)

___

### getItems

▸ **getItems**(): [`Item`](users_entities_item_entity.Item.md)[]

#### Returns

[`Item`](users_entities_item_entity.Item.md)[]

#### Defined in

[src/users/users.resolver.ts:99](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L99)

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

[src/users/users.resolver.ts:149](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L149)

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

[src/users/users.resolver.ts:164](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L164)

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

[src/users/users.resolver.ts:159](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L159)

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

[src/users/users.resolver.ts:135](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L135)

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

[src/users/users.resolver.ts:86](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L86)

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

[src/users/users.resolver.ts:112](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L112)

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

[src/users/users.resolver.ts:73](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L73)

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

[src/users/users.resolver.ts:123](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L123)

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

[src/users/users.resolver.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L104)

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

[src/users/users.resolver.ts:61](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L61)
