[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel-user/channel-user.service](../modules/prc_channel_channel_user_channel_user_service.md) / ChannelUserService

# Class: ChannelUserService

[prc/channel/channel-user/channel-user.service](../modules/prc_channel_channel_user_channel_user_service.md).ChannelUserService

## Table of contents

### Constructors

- [constructor](prc_channel_channel_user_channel_user_service.ChannelUserService.md#constructor)

### Properties

- [channelUserRepository](prc_channel_channel_user_channel_user_service.ChannelUserService.md#channeluserrepository)
- [prcGateway](prc_channel_channel_user_channel_user_service.ChannelUserService.md#prcgateway)

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

• **new ChannelUserService**(`channelUserRepository`, `prcGateway`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelUserRepository` | `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\> |
| `prcGateway` | [`PrcGateway`](prc_prc_gateway.PrcGateway.md) |

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L12)

## Properties

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L14)

___

### prcGateway

• `Private` `Readonly` **prcGateway**: [`PrcGateway`](prc_prc_gateway.PrcGateway.md)

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L15)

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

[src/prc/channel/channel-user/channel-user.service.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L18)

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

[src/prc/channel/channel-user/channel-user.service.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L43)

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

[src/prc/channel/channel-user/channel-user.service.ts:30](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L30)

___

### unban

▸ **unban**(`user`, `channelUser`, `channelName`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |
| `channelUser` | [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md) |
| `channelName` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:60](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L60)

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

[src/prc/channel/channel-user/channel-user.service.ts:110](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L110)

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

[src/prc/channel/channel-user/channel-user.service.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L50)

___

### updateBan

▸ **updateBan**(`user`, `channelUser`, `channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](users_entities_user_entity.User.md) |
| `channelUser` | [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md) |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:80](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L80)

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

[src/prc/channel/channel-user/channel-user.service.ts:119](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L119)
