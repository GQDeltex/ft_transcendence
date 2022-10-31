[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel-user/channel-user.resolver](../modules/prc_channel_channel_user_channel_user_resolver.md) / ChannelUserResolver

# Class: ChannelUserResolver

[prc/channel/channel-user/channel-user.resolver](../modules/prc_channel_channel_user_channel_user_resolver.md).ChannelUserResolver

## Table of contents

### Constructors

- [constructor](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#constructor)

### Properties

- [channelService](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#channelservice)
- [channelUserService](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#channeluserservice)
- [usersService](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#usersservice)

### Methods

- [findAll](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#findall)
- [findChannelUsersInChannel](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#findchannelusersinchannel)
- [updateAdmin](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#updateadmin)
- [updateBan](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#updateban)
- [updateMute](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#updatemute)
- [updatePassword](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md#updatepassword)

## Constructors

### constructor

• **new ChannelUserResolver**(`channelUserService`, `usersService`, `channelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUserService` | [`ChannelUserService`](prc_channel_channel_user_channel_user_service.ChannelUserService.md) |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `channelService` | [`ChannelService`](prc_channel_channel_service.ChannelService.md) |

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L19)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L22)

___

### channelUserService

• `Private` `Readonly` **channelUserService**: [`ChannelUserService`](prc_channel_channel_user_channel_user_service.ChannelUserService.md)

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L20)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:21](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L21)

## Methods

### findAll

▸ **findAll**(`jwtPayload`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L25)

___

### findChannelUsersInChannel

▸ **findChannelUsersInChannel**(`channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L30)

___

### updateAdmin

▸ **updateAdmin**(`JwtUser`, `channel_name`, `newAdmin`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `JwtUser` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `channel_name` | `string` |
| `newAdmin` | `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L51)

___

### updateBan

▸ **updateBan**(`jwtPayload`, `channel_name`, `banUser`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `channel_name` | `string` |
| `banUser` | `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:78](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L78)

___

### updateMute

▸ **updateMute**(`JwtUser`, `channel_name`, `muteUser`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `JwtUser` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `channel_name` | `string` |
| `muteUser` | `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:115](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L115)

___

### updatePassword

▸ **updatePassword**(`JwtUser`, `channel_name`, `newPassword`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `JwtUser` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `channel_name` | `string` |
| `newPassword` | `string` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.resolver.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.resolver.ts#L37)
