[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel.service](../modules/prc_channel_channel_service.md) / ChannelService

# Class: ChannelService

[prc/channel/channel.service](../modules/prc_channel_channel_service.md).ChannelService

## Table of contents

### Constructors

- [constructor](prc_channel_channel_service.ChannelService.md#constructor)

### Properties

- [channelRepository](prc_channel_channel_service.ChannelService.md#channelrepository)
- [channelUserRepository](prc_channel_channel_service.ChannelService.md#channeluserrepository)

### Methods

- [create](prc_channel_channel_service.ChannelService.md#create)
- [findAll](prc_channel_channel_service.ChannelService.md#findall)
- [findOne](prc_channel_channel_service.ChannelService.md#findone)
- [join](prc_channel_channel_service.ChannelService.md#join)

## Constructors

### constructor

• **new ChannelService**(`channelRepository`, `channelUserRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelRepository` | `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\> |
| `channelUserRepository` | `Repository`<[`ChannelUser`](prc_channel_entities_channeluser_entity.ChannelUser.md)\> |

#### Defined in

[src/prc/channel/channel.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L12)

## Properties

### channelRepository

• `Private` `Readonly` **channelRepository**: `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L14)

___

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_entities_channeluser_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L16)

## Methods

### create

▸ **create**(`createChannelInput`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/prc/channel/channel.service.ts:36](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L36)

___

### findAll

▸ **findAll**(): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.service.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L19)

___

### findOne

▸ **findOne**(`identifier`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L23)

___

### join

▸ **join**(`createChannelInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

( Tries to find Channel based on name ? creates channel : Checks input password )

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:45](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/prc/channel/channel.service.ts#L45)
