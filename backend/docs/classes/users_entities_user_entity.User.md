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
- [coalition](users_entities_user_entity.User.md#coalition)
- [country](users_entities_user_entity.User.md#country)
- [email](users_entities_user_entity.User.md#email)
- [firstname](users_entities_user_entity.User.md#firstname)
- [followers](users_entities_user_entity.User.md#followers)
- [followers\_id](users_entities_user_entity.User.md#followers_id)
- [following](users_entities_user_entity.User.md#following)
- [following\_id](users_entities_user_entity.User.md#following_id)
- [id](users_entities_user_entity.User.md#id)
- [intra](users_entities_user_entity.User.md#intra)
- [inventory](users_entities_user_entity.User.md#inventory)
- [lastLoggedIn](users_entities_user_entity.User.md#lastloggedin)
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

[src/users/entities/user.entity.ts:114](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L114)

___

### blockedBy\_id

• **blockedBy\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:117](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L117)

___

### blocking

• `Optional` **blocking**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L104)

___

### blocking\_id

• **blocking\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L107)

___

### campus

• **campus**: `string`

#### Defined in

[src/users/entities/user.entity.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L56)

___

### channelList

• `Optional` **channelList**: [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]

#### Defined in

[src/users/entities/user.entity.ts:125](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L125)

___

### coalition

• **coalition**: `string`

#### Defined in

[src/users/entities/user.entity.ts:52](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L52)

___

### country

• **country**: `string`

#### Defined in

[src/users/entities/user.entity.ts:60](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L60)

___

### email

• **email**: `string`

#### Defined in

[src/users/entities/user.entity.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L23)

___

### firstname

• **firstname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L31)

___

### followers

• `Optional` **followers**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:95](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L95)

___

### followers\_id

• **followers\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:98](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L98)

___

### following

• `Optional` **following**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:85](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L85)

___

### following\_id

• **following\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:88](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L88)

___

### id

• **id**: `number`

#### Defined in

[src/users/entities/user.entity.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L19)

___

### intra

• **intra**: `string`

#### Defined in

[src/users/entities/user.entity.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L27)

___

### inventory

• **inventory**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L64)

___

### lastLoggedIn

• **lastLoggedIn**: `Date`

#### Defined in

[src/users/entities/user.entity.ts:72](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L72)

___

### lastname

• **lastname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:35](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L35)

___

### picture

• **picture**: `string`

#### Defined in

[src/users/entities/user.entity.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L48)

___

### socketId

• **socketId**: `string`

#### Defined in

[src/users/entities/user.entity.ts:129](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L129)

___

### status

• **status**: `string`

#### Defined in

[src/users/entities/user.entity.ts:68](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L68)

___

### title

• **title**: `string`[]

#### Defined in

[src/users/entities/user.entity.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L44)

___

### twoFAEnable

• **twoFAEnable**: `boolean`

#### Defined in

[src/users/entities/user.entity.ts:79](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L79)

___

### twoFASecret

• **twoFASecret**: ``null`` \| `string`

#### Defined in

[src/users/entities/user.entity.ts:75](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L75)

___

### username

• **username**: `string`

#### Defined in

[src/users/entities/user.entity.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L40)

## Accessors

### friends

• `get` **friends**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:138](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L138)

___

### receivedFriendRequests

• `get` **receivedFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:154](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L154)

___

### sentFriendRequests

• `get` **sentFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:146](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L146)

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

[src/users/entities/user.entity.ts:131](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L131)
