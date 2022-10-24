[backend](../README.md) / [Exports](../modules.md) / [users/users.resolver](../modules/users_users_resolver.md) / UsersResolver

# Class: UsersResolver

[users/users.resolver](../modules/users_users_resolver.md).UsersResolver

## Table of contents

### Constructors

- [constructor](users_users_resolver.UsersResolver.md#constructor)

### Properties

- [usersService](users_users_resolver.UsersResolver.md#usersservice)

### Methods

- [findAll](users_users_resolver.UsersResolver.md#findall)
- [findOneById](users_users_resolver.UsersResolver.md#findonebyid)
- [findOneByUsername](users_users_resolver.UsersResolver.md#findonebyusername)
- [findUserChannelList](users_users_resolver.UsersResolver.md#finduserchannellist)
- [friends](users_users_resolver.UsersResolver.md#friends)
- [receivedFriendRequests](users_users_resolver.UsersResolver.md#receivedfriendrequests)
- [sentFriendRequests](users_users_resolver.UsersResolver.md#sentfriendrequests)
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

[src/users/users.resolver.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L25)

## Properties

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/users/users.resolver.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L25)

## Methods

### findAll

▸ **findAll**(): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L27)

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

[src/users/users.resolver.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L32)

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

[src/users/users.resolver.ts:42](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L42)

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

[src/users/users.resolver.ts:47](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L47)

___

### friends

▸ **friends**(`user`): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:77](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L77)

___

### receivedFriendRequests

▸ **receivedFriendRequests**(`user`): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:102](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L102)

___

### sentFriendRequests

▸ **sentFriendRequests**(`user`): `Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`User`](users_entities_user_entity.User.md)[]\>

#### Defined in

[src/users/users.resolver.ts:89](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L89)

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

[src/users/users.resolver.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L64)

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

[src/users/users.resolver.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/users.resolver.ts#L52)
