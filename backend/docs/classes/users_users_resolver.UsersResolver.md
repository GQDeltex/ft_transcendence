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
- [findAll](users_users_resolver.UsersResolver.md#findall)
- [findOneById](users_users_resolver.UsersResolver.md#findonebyid)
- [findOneByUsername](users_users_resolver.UsersResolver.md#findonebyusername)
- [findUserChannelList](users_users_resolver.UsersResolver.md#finduserchannellist)
- [friends](users_users_resolver.UsersResolver.md#friends)
- [getItems](users_users_resolver.UsersResolver.md#getitems)
- [receivedFriendRequests](users_users_resolver.UsersResolver.md#receivedfriendrequests)
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
- [status](users_users_resolver.UsersResolver.md#status)
- [updateBlocking](users_users_resolver.UsersResolver.md#updateblocking)
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

[src/users/users.resolver.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L27)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L27)

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

[src/users/users.resolver.ts:139](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L139)

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

[src/users/users.resolver.ts:134](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L134)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L29)

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

[src/users/users.resolver.ts:34](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L34)

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

[src/users/users.resolver.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L44)

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

[src/users/users.resolver.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L49)

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

[src/users/users.resolver.ts:119](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L119)

___

### getItems

▸ **getItems**(): [`Item`](users_entities_item_entity.Item.md)[]

#### Returns

[`Item`](users_entities_item_entity.Item.md)[]

#### Defined in

[src/users/users.resolver.ts:92](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L92)

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

[src/users/users.resolver.ts:129](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L129)

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

[src/users/users.resolver.ts:124](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L124)

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

[src/users/users.resolver.ts:105](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L105)

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

[src/users/users.resolver.ts:79](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L79)

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

[src/users/users.resolver.ts:66](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L66)

___

### updateInventory

▸ **updateInventory**(`user`, `orderId`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `orderId` | `string` |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:97](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L97)

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

[src/users/users.resolver.ts:54](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L54)
