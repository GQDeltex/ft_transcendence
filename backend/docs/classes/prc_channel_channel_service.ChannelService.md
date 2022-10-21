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

[src/prc/channel/channel.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L12)

## Properties

### channelRepository

• `Private` `Readonly` **channelRepository**: `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L14)

___

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_entities_channeluser_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L16)

## Methods

### create

▸ **create**(`createChannelInput`): `Promise`<`number`\>

Create a new channel.

Args:
  createChannelInput: The input for the createChannel method.
Returns:
  The id of the newly created channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/prc/channel/channel.service.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L50)

___

### findAll

▸ **findAll**(): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.service.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L19)

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

[src/prc/channel/channel.service.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L29)

___

### join

▸ **join**(`createChannelInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

1. First, we try to find the channel by its name. If it doesn’t exist, we create it.
2. Then, we check if the password is correct. If it is, we add the user to the channel.
3. If the password is incorrect, we throw an error.
4. If the user is already in the channel, we throw an error.
5. Finally, we return the channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L64)
