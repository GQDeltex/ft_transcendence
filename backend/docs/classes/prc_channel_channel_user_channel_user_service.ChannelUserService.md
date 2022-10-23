[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel-user/channel-user.service](../modules/prc_channel_channel_user_channel_user_service.md) / ChannelUserService

# Class: ChannelUserService

[prc/channel/channel-user/channel-user.service](../modules/prc_channel_channel_user_channel_user_service.md).ChannelUserService

## Table of contents

### Constructors

- [constructor](prc_channel_channel_user_channel_user_service.ChannelUserService.md#constructor)

### Properties

- [channelUserRepository](prc_channel_channel_user_channel_user_service.ChannelUserService.md#channeluserrepository)

### Methods

- [findAll](prc_channel_channel_user_channel_user_service.ChannelUserService.md#findall)
- [findOne](prc_channel_channel_user_channel_user_service.ChannelUserService.md#findone)

## Constructors

### constructor

• **new ChannelUserService**(`channelUserRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUserRepository` | `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\> |

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:8](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L8)

## Properties

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:10](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L10)

## Methods

### findAll

▸ **findAll**(): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L13)

___

### findOne

▸ **findOne**(`identifier`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `string` \| `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:17](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L17)
