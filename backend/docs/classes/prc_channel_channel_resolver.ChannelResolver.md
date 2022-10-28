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
- [findOneByChannelName](prc_channel_channel_resolver.ChannelResolver.md#findonebychannelname)
- [findOneById](prc_channel_channel_resolver.ChannelResolver.md#findonebyid)
- [hasPassword](prc_channel_channel_resolver.ChannelResolver.md#haspassword)
- [joinChannel](prc_channel_channel_resolver.ChannelResolver.md#joinchannel)
- [leaveChannel](prc_channel_channel_resolver.ChannelResolver.md#leavechannel)

## Constructors

### constructor

• **new ChannelResolver**(`channelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelService` | [`ChannelService`](prc_channel_channel_service.ChannelService.md) |

#### Defined in

[src/prc/channel/channel.resolver.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L24)

## Properties

### channelService

• `Private` `Readonly` **channelService**: [`ChannelService`](prc_channel_channel_service.ChannelService.md)

#### Defined in

[src/prc/channel/channel.resolver.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L24)

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

[src/prc/channel/channel.resolver.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L26)

___

### findOneByChannelName

▸ **findOneByChannelName**(`channelName`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.resolver.ts:36](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L36)

___

### findOneById

▸ **findOneById**(`id`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

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

[src/prc/channel/channel.resolver.ts:41](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L41)

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

[src/prc/channel/channel.resolver.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L49)

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

[src/prc/channel/channel.resolver.ts:57](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.resolver.ts#L57)
