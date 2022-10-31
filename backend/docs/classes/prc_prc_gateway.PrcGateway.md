[backend](../README.md) / [Exports](../modules.md) / [prc/prc.gateway](../modules/prc_prc_gateway.md) / PrcGateway

# Class: PrcGateway

[prc/prc.gateway](../modules/prc_prc_gateway.md).PrcGateway

## Implements

- `OnGatewayDisconnect`

## Table of contents

### Constructors

- [constructor](prc_prc_gateway.PrcGateway.md#constructor)

### Properties

- [channelService](prc_prc_gateway.PrcGateway.md#channelservice)
- [channelUserResolver](prc_prc_gateway.PrcGateway.md#channeluserresolver)
- [channelUserService](prc_prc_gateway.PrcGateway.md#channeluserservice)
- [server](prc_prc_gateway.PrcGateway.md#server)
- [usersService](prc_prc_gateway.PrcGateway.md#usersservice)

### Methods

- [connect](prc_prc_gateway.PrcGateway.md#connect)
- [handleDisconnect](prc_prc_gateway.PrcGateway.md#handledisconnect)
- [joinChannel](prc_prc_gateway.PrcGateway.md#joinchannel)
- [leaveChannel](prc_prc_gateway.PrcGateway.md#leavechannel)
- [prcMessage](prc_prc_gateway.PrcGateway.md#prcmessage)
- [unban](prc_prc_gateway.PrcGateway.md#unban)
- [updateBan](prc_prc_gateway.PrcGateway.md#updateban)

## Constructors

### constructor

• **new PrcGateway**(`usersService`, `channelService`, `channelUserService`, `channelUserResolver`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `channelService` | [`ChannelService`](prc_channel_channel_service.ChannelService.md) |
| `channelUserService` | [`ChannelUserService`](prc_channel_channel_user_channel_user_service.ChannelUserService.md) |
| `channelUserResolver` | [`ChannelUserResolver`](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md) |

#### Defined in

[src/prc/prc.gateway.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L49)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/prc.gateway.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L52)

___

### channelUserResolver

• `Private` `Readonly` **channelUserResolver**: [`ChannelUserResolver`](prc_channel_channel_user_channel_user_resolver.ChannelUserResolver.md)

#### Defined in

[src/prc/prc.gateway.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L55)

___

### channelUserService

• `Private` `Readonly` **channelUserService**: [`ChannelUserService`](prc_channel_channel_user_channel_user_service.ChannelUserService.md)

#### Defined in

[src/prc/prc.gateway.ts:53](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L53)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/prc/prc.gateway.ts:47](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L47)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/prc/prc.gateway.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L51)

## Methods

### connect

▸ **connect**(`jwtToken`, `client`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtToken` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:70](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L70)

___

### handleDisconnect

▸ **handleDisconnect**(`client`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

OnGatewayDisconnect.handleDisconnect

#### Defined in

[src/prc/prc.gateway.ts:58](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L58)

___

### joinChannel

▸ **joinChannel**(`user`, `client`, `channelInput`): `Promise`<{ `id`: `number` = channel.id; `name`: `string` = channel.name; `private`: `boolean` = channel.private }\>

It creates a new channel and adds the user to it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `channelInput` | [`CreateChannelInput`](prc_channel_channel_input.CreateChannelInput.md) |

#### Returns

`Promise`<{ `id`: `number` = channel.id; `name`: `string` = channel.name; `private`: `boolean` = channel.private }\>

#### Defined in

[src/prc/prc.gateway.ts:167](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L167)

___

### leaveChannel

▸ **leaveChannel**(`jwtPayload`, `client`, `leaveChannelInput`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `leaveChannelInput` | [`LeaveChannelInput`](prc_channel_channel_input.LeaveChannelInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:192](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L192)

___

### prcMessage

▸ **prcMessage**(`user`, `to`, `msg`, `client`): `Promise`<`void`\>

It sends message to a channel or user.

Args:
user: The user who sent the message.
to: The recipient of the message.
msg: The message that was sent.
client: The socket that sent the message.
Returns:
Nothing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `to` | `string` |
| `msg` | `string` |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:109](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L109)

___

### unban

▸ **unban**(`userSocket`, `channelUserID`, `channelName`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userSocket` | `any` |
| `channelUserID` | `number` |
| `channelName` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:213](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L213)

___

### updateBan

▸ **updateBan**(`jwtPayload`, `channelName`, `banID`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `channelName` | `string` |
| `banID` | `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/prc.gateway.ts:222](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L222)
