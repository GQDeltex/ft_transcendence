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
- [findMessagesForRecipient](prc_channel_channel_service.ChannelService.md#findmessagesforrecipient)
- [findOne](prc_channel_channel_service.ChannelService.md#findone)
- [join](prc_channel_channel_service.ChannelService.md#join)
- [saveMessage](prc_channel_channel_service.ChannelService.md#savemessage)
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

[src/prc/channel/channel.service.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L20)

## Properties

### channelRepository

• `Private` `Readonly` **channelRepository**: `Repository`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L22)

___

### channelUserRepository

• `Private` `Readonly` **channelUserRepository**: `Repository`<[`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L24)

___

### messages

• **messages**: [`Message`](prc_message_message.Message.md)[] = `[]`

#### Defined in

[src/prc/channel/channel.service.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L18)

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

[src/prc/channel/channel.service.ts:58](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L58)

___

### findAll

▸ **findAll**(): `Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)[]\>

#### Defined in

[src/prc/channel/channel.service.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L27)

___

### findMessagesForRecipient

▸ **findMessagesForRecipient**(`recipient`): [`Message`](prc_message_message.Message.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | `string` |

#### Returns

[`Message`](prc_message_message.Message.md)[]

#### Defined in

[src/prc/channel/channel.service.ts:69](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L69)

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

[src/prc/channel/channel.service.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L37)

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
| `createChannelInput` | [`CreateChannelInput`](prc_channel_dto_create_channel_input.CreateChannelInput.md) |
| `user` | [`User`](users_entities_user_entity.User.md) |

#### Returns

`Promise`<[`Channel`](prc_channel_entities_channel_entity.Channel.md)\>

#### Defined in

[src/prc/channel/channel.service.ts:82](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L82)

___

### saveMessage

▸ **saveMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](prc_message_message.Message.md) |

#### Returns

`void`

#### Defined in

[src/prc/channel/channel.service.ts:65](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L65)

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

[src/prc/channel/channel.service.ts:114](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/prc/channel/channel.service.ts#L114)
