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
- [server](prc_prc_gateway.PrcGateway.md#server)
- [usersService](prc_prc_gateway.PrcGateway.md#usersservice)

### Methods

- [connect](prc_prc_gateway.PrcGateway.md#connect)
- [handleDisconnect](prc_prc_gateway.PrcGateway.md#handledisconnect)
- [joinChannel](prc_prc_gateway.PrcGateway.md#joinchannel)
- [leaveChannel](prc_prc_gateway.PrcGateway.md#leavechannel)
- [prcMessage](prc_prc_gateway.PrcGateway.md#prcmessage)

## Constructors

### constructor

• **new PrcGateway**(`usersService`, `channelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `channelService` | [`ChannelService`](prc_channel_channel_service.ChannelService.md) |

#### Defined in

[src/prc/prc.gateway.ts:47](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L47)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/prc.gateway.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L50)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/prc/prc.gateway.ts:45](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L45)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/prc/prc.gateway.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L49)

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

[src/prc/prc.gateway.ts:65](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L65)

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

[src/prc/prc.gateway.ts:53](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L53)

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

[src/prc/prc.gateway.ts:162](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L162)

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

[src/prc/prc.gateway.ts:187](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L187)

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

[src/prc/prc.gateway.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L104)
