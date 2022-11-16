[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel.resolver](../modules/prc_channel_channel_resolver.md) / ChannelResolver

# Class: ChannelResolver

[prc/channel/channel.resolver](../modules/prc_channel_channel_resolver.md).ChannelResolver

## Table of contents

### Constructors

- [constructor](prc_channel_channel_resolver.ChannelResolver.md#constructor)

### Properties

- [channelService](prc_channel_channel_resolver.ChannelResolver.md#channelservice)

### Methods

- [findAll](prc_channel_channel_resolver.ChannelResolver.md#findall)
- [hasPassword](prc_channel_channel_resolver.ChannelResolver.md#haspassword)
- [joinChannel](prc_channel_channel_resolver.ChannelResolver.md#joinchannel)
- [leaveChannel](prc_channel_channel_resolver.ChannelResolver.md#leavechannel)
- [updateChannelPublic](prc_channel_channel_resolver.ChannelResolver.md#updatechannelpublic)

## Constructors

### constructor

• **new ChannelResolver**(`channelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelService` | [`ChannelService`](prc_channel_channel_service.ChannelService.md) |

#### Defined in

[src/prc/channel/channel.resolver.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L29)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/channel/channel.resolver.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L29)

## Methods

### findAll

▸ **findAll**(`user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.resolver.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L31)

___

### hasPassword

▸ **hasPassword**(`channel`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](prc_channel_entities_channel_entity.Channel.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/prc/channel/channel.resolver.ts:36](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L36)

___

### joinChannel

▸ **joinChannel**(`createChannelInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_channel_input.CreateChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.resolver.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L44)

___

### leaveChannel

▸ **leaveChannel**(`leaveChannelInput`, `user`): `Promise`<``null`` \| [`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `leaveChannelInput` | [`LeaveChannelInput`](prc_channel_channel_input.LeaveChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<``null`` \| [`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.resolver.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L52)

___

### updateChannelPublic

▸ **updateChannelPublic**(`toggleChannelPpInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `toggleChannelPpInput` | [`ToggleChannelPpInput`](prc_channel_channel_input.ToggleChannelPpInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.resolver.ts:60](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L60)
