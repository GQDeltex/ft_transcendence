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
- [findChannelUserInChannel](prc_channel_channel_user_channel_user_service.ChannelUserService.md#findchanneluserinchannel)
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

[src/prc/channel/channel-user/channel-user.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L16)

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

[src/prc/channel/channel-user/channel-user.service.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L19)

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

[src/prc/channel/channel-user/channel-user.service.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L44)

___

### findChannelUserInChannel

▸ **findChannelUserInChannel**(`userId`, `channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L51)

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

[src/prc/channel/channel-user/channel-user.service.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L31)

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

[src/prc/channel/channel-user/channel-user.service.ts:83](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L83)

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

[src/prc/channel/channel-user/channel-user.service.ts:133](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L133)

___

### updateAdmin

▸ **updateAdmin**(`userId`, `otherId`, `channelName`): `Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `otherId` | `number` |
| `channelName` | `string` |

#### Returns

`Promise`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel-user/channel-user.service.ts:57](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L57)

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

[src/prc/channel/channel-user/channel-user.service.ts:103](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L103)

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

[src/prc/channel/channel-user/channel-user.service.ts:142](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel-user/channel-user.service.ts#L142)
