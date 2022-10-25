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
- [receivedFriendRequests](users_users_resolver.UsersResolver.md#receivedfriendrequests)
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
- [updateBlocking](users_users_resolver.UsersResolver.md#updateblocking)
- [updateFriendship](users_users_resolver.UsersResolver.md#updatefriendship)
- [updateUsername](users_users_resolver.UsersResolver.md#updateusername)

## Constructors

### constructor

• **new UsersResolver**(`usersService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |

#### Defined in

[src/users/users.resolver.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L26)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L26)

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

[src/users/users.resolver.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L107)

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

[src/users/users.resolver.ts:102](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L102)

___

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:28](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L28)

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

[src/users/users.resolver.ts:33](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L33)

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

[src/users/users.resolver.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L43)

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

[src/users/users.resolver.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L48)

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

[src/users/users.resolver.ts:87](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L87)

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

[src/users/users.resolver.ts:97](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L97)

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

[src/users/users.resolver.ts:92](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L92)

___

### updateBlocking

▸ **updateBlocking**(`user`, `args`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `args` | [`UpdateUserBlockingInput`](users_dto_update_blocking_input.UpdateUserBlockingInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:78](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L78)

___

### updateFriendship

▸ **updateFriendship**(`user`, `args`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `args` | [`UpdateUserFriendshipInput`](users_dto_update_friendship_input.UpdateUserFriendshipInput.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:65](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L65)

___

### updateUsername

▸ **updateUsername**(`updateUserUsernameInput`, `user`): `Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `updateUserUsernameInput` | [`UpdateUserUsernameInput`](users_dto_update_userusername_input.UpdateUserUsernameInput.md) |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)\>

#### Defined in

[src/users/users.resolver.ts:53](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L53)
