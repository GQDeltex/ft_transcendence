[backend](../README.md) / [Exports](../modules.md) / [users/entities/user.entity](../modules/users_entities_user_entity.md) / User

# Class: User

[users/entities/user.entity](../modules/users_entities_user_entity.md).User

## Table of contents

### Constructors

- [constructor](users_entities_user_entity.User.md#constructor)

### Properties

- [blockedBy](users_entities_user_entity.User.md#blockedby)
- [blockedBy\_id](users_entities_user_entity.User.md#blockedby_id)
- [blocking](users_entities_user_entity.User.md#blocking)
- [blocking\_id](users_entities_user_entity.User.md#blocking_id)
- [campus](users_entities_user_entity.User.md#campus)
- [channelList](users_entities_user_entity.User.md#channellist)
- [country](users_entities_user_entity.User.md#country)
- [email](users_entities_user_entity.User.md#email)
- [firstname](users_entities_user_entity.User.md#firstname)
- [followers](users_entities_user_entity.User.md#followers)
- [followers\_id](users_entities_user_entity.User.md#followers_id)
- [following](users_entities_user_entity.User.md#following)
- [following\_id](users_entities_user_entity.User.md#following_id)
- [id](users_entities_user_entity.User.md#id)
- [inventory](users_entities_user_entity.User.md#inventory)
- [lastname](users_entities_user_entity.User.md#lastname)
- [picture](users_entities_user_entity.User.md#picture)
- [socketId](users_entities_user_entity.User.md#socketid)
- [status](users_entities_user_entity.User.md#status)
- [title](users_entities_user_entity.User.md#title)
- [twoFAEnable](users_entities_user_entity.User.md#twofaenable)
- [twoFASecret](users_entities_user_entity.User.md#twofasecret)
- [username](users_entities_user_entity.User.md#username)

### Accessors

- [friends](users_entities_user_entity.User.md#friends)
- [receivedFriendRequests](users_entities_user_entity.User.md#receivedfriendrequests)
- [sentFriendRequests](users_entities_user_entity.User.md#sentfriendrequests)

### Methods

- [isInChannel](users_entities_user_entity.User.md#isinchannel)

## Constructors

### constructor

• **new User**()

## Properties

### blockedBy

• `Optional` **blockedBy**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:100](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L100)

___

### blockedBy\_id

• **blockedBy\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:103](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L103)

___

### blocking

• `Optional` **blocking**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:91](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L91)

___

### blocking\_id

• **blocking\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:94](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L94)

___

### campus

• **campus**: `string`

#### Defined in

[src/users/entities/user.entity.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L44)

___

### channelList

• `Optional` **channelList**: [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]

#### Defined in

[src/users/entities/user.entity.ts:111](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L111)

___

### country

• **country**: `string`

#### Defined in

[src/users/entities/user.entity.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L48)

___

### email

• **email**: `string`

#### Defined in

[src/users/entities/user.entity.ts:36](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L36)

___

### firstname

• **firstname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L23)

___

### followers

• `Optional` **followers**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:82](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L82)

___

### followers\_id

• **followers\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:85](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L85)

___

### following

• `Optional` **following**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:73](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L73)

___

### following\_id

• **following\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:76](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L76)

___

### id

• **id**: `number`

#### Defined in

[src/users/entities/user.entity.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L19)

___

### inventory

• **inventory**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:115](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L115)

___

### lastname

• **lastname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L27)

___

### picture

• **picture**: `string`

#### Defined in

[src/users/entities/user.entity.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L40)

___

### socketId

• **socketId**: `string`

#### Defined in

[src/users/entities/user.entity.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L63)

___

### status

• **status**: `string`

#### Defined in

[src/users/entities/user.entity.ts:67](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L67)

___

### title

• **title**: `string`[]

#### Defined in

[src/users/entities/user.entity.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L52)

___

### twoFAEnable

• **twoFAEnable**: `boolean`

#### Defined in

[src/users/entities/user.entity.ts:59](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L59)

___

### twoFASecret

• **twoFASecret**: ``null`` \| `string`

#### Defined in

[src/users/entities/user.entity.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L55)

___

### username

• **username**: `string`

#### Defined in

[src/users/entities/user.entity.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L32)

## Accessors

### friends

• `get` **friends**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:124](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L124)

___

### receivedFriendRequests

• `get` **receivedFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:140](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L140)

___

### sentFriendRequests

• `get` **sentFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:132](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L132)

## Methods

### isInChannel

▸ **isInChannel**(`channelName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelName` | `string` |

#### Returns

`boolean`

#### Defined in

[src/users/entities/user.entity.ts:117](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L117)
