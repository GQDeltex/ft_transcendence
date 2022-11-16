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
- [equipped](users_entities_user_entity.User.md#equipped)
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
- [points](users_entities_user_entity.User.md#points)
- [receivedGameRequests](users_entities_user_entity.User.md#receivedgamerequests)
- [receivedGameRequests\_id](users_entities_user_entity.User.md#receivedgamerequests_id)
- [sentGameRequests](users_entities_user_entity.User.md#sentgamerequests)
- [sentGameRequests\_id](users_entities_user_entity.User.md#sentgamerequests_id)
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

[src/users/entities/user.entity.ts:120](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L120)

___

### blockedBy\_id

• **blockedBy\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:123](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L123)

___

### blocking

• `Optional` **blocking**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:110](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L110)

___

### blocking\_id

• **blocking\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:113](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L113)

___

### campus

• **campus**: `string`

#### Defined in

[src/users/entities/user.entity.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L56)

___

### channelList

• `Optional` **channelList**: [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]

#### Defined in

[src/users/entities/user.entity.ts:131](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L131)

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

### equipped

• **equipped**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:71](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L71)

___

### firstname

• **firstname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L31)

___

### followers

• `Optional` **followers**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:101](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L101)

___

### followers\_id

• **followers\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L104)

___

### following

• `Optional` **following**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:91](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L91)

___

### following\_id

• **following\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:94](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L94)

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

[src/users/entities/user.entity.ts:68](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L68)

___

### lastLoggedIn

• **lastLoggedIn**: `Date`

#### Defined in

[src/users/entities/user.entity.ts:78](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L78)

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

### points

• **points**: `number`

#### Defined in

[src/users/entities/user.entity.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L64)

___

### receivedGameRequests

• `Optional` **receivedGameRequests**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:152](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L152)

___

### receivedGameRequests\_id

• **receivedGameRequests\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:156](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L156)

___

### sentGameRequests

• `Optional` **sentGameRequests**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:141](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L141)

___

### sentGameRequests\_id

• **sentGameRequests\_id**: ``null`` \| `number`[]

#### Defined in

[src/users/entities/user.entity.ts:145](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L145)

___

### socketId

• **socketId**: `string`

#### Defined in

[src/users/entities/user.entity.ts:135](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L135)

___

### status

• **status**: `string`

#### Defined in

[src/users/entities/user.entity.ts:74](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L74)

___

### title

• **title**: `string`[]

#### Defined in

[src/users/entities/user.entity.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L44)

___

### twoFAEnable

• **twoFAEnable**: `boolean`

#### Defined in

[src/users/entities/user.entity.ts:85](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L85)

___

### twoFASecret

• **twoFASecret**: ``null`` \| `string`

#### Defined in

[src/users/entities/user.entity.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L81)

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

[src/users/entities/user.entity.ts:165](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L165)

___

### receivedFriendRequests

• `get` **receivedFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:181](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L181)

___

### sentFriendRequests

• `get` **sentFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:173](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L173)

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

[src/users/entities/user.entity.ts:158](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L158)
