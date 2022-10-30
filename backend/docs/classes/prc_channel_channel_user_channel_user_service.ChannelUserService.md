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
- [findAllInChannel](prc_channel_channel_user_channel_user_service.ChannelUserService.md#findallinchannel)
- [findOne](prc_channel_channel_user_channel_user_service.ChannelUserService.md#findone)
- [unban](prc_channel_channel_user_channel_user_service.ChannelUserService.md#unban)
- [unmute](prc_channel_channel_user_channel_user_service.ChannelUserService.md#unmute)
- [updateAdmin](prc_channel_channel_user_channel_user_service.ChannelUserService.md#updateadmin)
- [updateBan](prc_channel_channel_user_channel_user_service.ChannelUserService.md#updateban)
- [updateMute](prc_channel_channel_user_channel_user_service.ChannelUserService.md#updatemute)

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

▸ **findAll**(`userId`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L13)

___

### findAllInChannel

▸ **findAllInChannel**(`channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L38)

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

[src/prc/channel/channel-user/channel-user.service.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L25)

___

### unban

▸ **unban**(`channelUserID`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUserID` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L55)

___

### unmute

▸ **unmute**(`channelUserID`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUserID` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:75](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L75)

___

### updateAdmin

▸ **updateAdmin**(`channelUser`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUser` | [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md) |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:45](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L45)

___

### updateBan

▸ **updateBan**(`channelUser`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUser` | [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md) |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L64)

___

### updateMute

▸ **updateMute**(`channelUser`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUser` | [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md) |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:84](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L84)
