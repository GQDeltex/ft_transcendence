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

[src/prc/prc.gateway.ts:78](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L78)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/prc.gateway.ts:80](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L80)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/prc/prc.gateway.ts:76](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L76)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/prc/prc.gateway.ts:79](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L79)

## Methods

### connect

▸ **connect**(`JWTtoken`, `client`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `JWTtoken` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:95](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L95)

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

[src/prc/prc.gateway.ts:83](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L83)

___

### joinChannel

▸ **joinChannel**(`user`, `client`, `channelInput`): `Promise`<`void`\>

It creates a new channel and adds the user to it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `channelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/prc.gateway.ts:174](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L174)

___

### prcMessage

▸ **prcMessage**(`user`, `to`, `msg`, `client`): `Promise`<`void`\>

It sends mmessage to a channel or user.

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

[src/prc/prc.gateway.ts:128](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/prc.gateway.ts#L128)