[backend](../README.md) / [Exports](../modules.md) / [prc/channel/channel.service](../modules/prc_channel_channel_service.md) / ChannelService

# Class: ChannelService

[prc/channel/channel.service](../modules/prc_channel_channel_service.md).ChannelService

## Table of contents

### Constructors

- [constructor](prc_channel_channel_service.ChannelService.md#constructor)

### Properties

- [channelRepository](prc_channel_channel_service.ChannelService.md#channelrepository)
- [channelUserRepository](prc_channel_channel_service.ChannelService.md#channeluserrepository)
- [messages](prc_channel_channel_service.ChannelService.md#messages)

### Methods

- [create](prc_channel_channel_service.ChannelService.md#create)
- [findAll](prc_channel_channel_service.ChannelService.md#findall)
- [findJoined](prc_channel_channel_service.ChannelService.md#findjoined)
- [findMessagesForRecipient](prc_channel_channel_service.ChannelService.md#findmessagesforrecipient)
- [findOne](prc_channel_channel_service.ChannelService.md#findone)
- [join](prc_channel_channel_service.ChannelService.md#join)
- [leave](prc_channel_channel_service.ChannelService.md#leave)
- [saveMessage](prc_channel_channel_service.ChannelService.md#savemessage)
- [toggleChannel](prc_channel_channel_service.ChannelService.md#togglechannel)
- [updatePassword](prc_channel_channel_service.ChannelService.md#updatepassword)

## Constructors

### constructor

• **new ChannelService**(`channelRepository`, `channelUserRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelRepository` | `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\> |
| `channelUserRepository` | `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\> |

#### Defined in

[src/prc/channel/channel.service.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L22)

## Properties

### channelRepository

• `Private` `Readonly` **channelRepository**: `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L24)

___

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L26)

___

### messages

• **messages**: [`Message`](../modules/prc_message_message.md#message)[] = `[]`

#### Defined in

[src/prc/channel/channel.service.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L20)

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
| `createChannelInput` | [`CreateChannelInput`](prc_channel_channel_input.CreateChannelInput.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/prc/channel/channel.service.ts:70](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L70)

___

### findAll

▸ **findAll**(): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.service.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L29)

___

### findJoined

▸ **findJoined**(`identifier`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier` | `number` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.service.ts:33](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L33)

___

### findMessagesForRecipient

▸ **findMessagesForRecipient**(`recipient`): [`Message`](../modules/prc_message_message.md#message)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | `string` |

#### Returns

[`Message`](../modules/prc_message_message.md#message)[]

#### Defined in

[src/prc/channel/channel.service.ts:85](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L85)

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

[src/prc/channel/channel.service.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L49)

___

### join

▸ **join**(`createChannelInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

1. First, we try to find the channel by its name. If it doesn't exist, we create it.
2. Then, we check if the password is correct. If it is, we add the user to the channel.
3. If the password is incorrect, we throw an error.
4. If the user is already in the channel, we throw an error.
5. Finally, we return the channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `createChannelInput` | [`CreateChannelInput`](prc_channel_channel_input.CreateChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:98](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L98)

___

### leave

▸ **leave**(`channelName`, `user`): `Promise`<``null`` \| [`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<``null`` \| [`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:150](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L150)

___

### saveMessage

▸ **saveMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../modules/prc_message_message.md#message) |

#### Returns

`void`

#### Defined in

[src/prc/channel/channel.service.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L81)

___

### toggleChannel

▸ **toggleChannel**(`toggleChannelPpInput`, `user`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `toggleChannelPpInput` | [`ToggleChannelPpInput`](prc_channel_channel_input.ToggleChannelPpInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:129](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L129)

___

### updatePassword

▸ **updatePassword**(`channelName`, `newPassword`): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

1. First, we’re using the `update` method to update the password of the channel.
2. Then, we’re using the `findOne` method to get the updated channel.
3. Finally, we’re returning the updated channel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |
| `newPassword` | `string` |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:216](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L216)
