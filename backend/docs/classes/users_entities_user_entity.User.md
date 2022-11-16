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
- [default\_picture](users_entities_user_entity.User.md#default_picture)
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

[src/users/entities/user.entity.ts:123](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L123)

___

### blockedBy\_id

• **blockedBy\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:126](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L126)

___

### blocking

• `Optional` **blocking**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:113](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L113)

___

### blocking\_id

• **blocking\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:116](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L116)

___

### campus

• **campus**: `string`

#### Defined in

[src/users/entities/user.entity.ts:59](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L59)

___

### channelList

• `Optional` **channelList**: [`ChannelUser`](prc_channel_channel_user_entities_channel_user_entity.ChannelUser.md)[]

#### Defined in

[src/users/entities/user.entity.ts:134](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L134)

___

### coalition

• **coalition**: `string`

#### Defined in

[src/users/entities/user.entity.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L55)

___

### country

• **country**: `string`

#### Defined in

[src/users/entities/user.entity.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L63)

___

### default\_picture

• **default\_picture**: `string`

#### Defined in

[src/users/entities/user.entity.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L51)

___

### email

• **email**: `string`

#### Defined in

[src/users/entities/user.entity.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L23)

___

### equipped

• **equipped**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:74](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L74)

___

### firstname

• **firstname**: `string`

#### Defined in

[src/users/entities/user.entity.ts:31](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L31)

___

### followers

• `Optional` **followers**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:104](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L104)

___

### followers\_id

• **followers\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L107)

___

### following

• `Optional` **following**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:94](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L94)

___

### following\_id

• **following\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:97](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L97)

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

[src/users/entities/user.entity.ts:71](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L71)

___

### lastLoggedIn

• **lastLoggedIn**: `Date`

#### Defined in

[src/users/entities/user.entity.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L81)

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

[src/users/entities/user.entity.ts:67](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L67)

___

### receivedGameRequests

• `Optional` **receivedGameRequests**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:155](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L155)

___

### receivedGameRequests\_id

• **receivedGameRequests\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:159](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L159)

___

### sentGameRequests

• `Optional` **sentGameRequests**: [`User`](users_entities_user_entity.User.md)[]

#### Defined in

[src/users/entities/user.entity.ts:144](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L144)

___

### sentGameRequests\_id

• **sentGameRequests\_id**: `number`[]

#### Defined in

[src/users/entities/user.entity.ts:148](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L148)

___

### socketId

• **socketId**: `string`

#### Defined in

[src/users/entities/user.entity.ts:138](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L138)

___

### status

• **status**: `string`

#### Defined in

[src/users/entities/user.entity.ts:77](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L77)

___

### title

• **title**: `string`[]

#### Defined in

[src/users/entities/user.entity.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L44)

___

### twoFAEnable

• **twoFAEnable**: `boolean`

#### Defined in

[src/users/entities/user.entity.ts:88](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L88)

___

### twoFASecret

• **twoFASecret**: ``null`` \| `string`

#### Defined in

[src/users/entities/user.entity.ts:84](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L84)

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

[src/users/entities/user.entity.ts:168](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L168)

___

### receivedFriendRequests

• `get` **receivedFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:184](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L184)

___

### sentFriendRequests

• `get` **sentFriendRequests**(): `number`[]

#### Returns

`number`[]

#### Defined in

[src/users/entities/user.entity.ts:176](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L176)

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

[src/users/entities/user.entity.ts:161](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/users/entities/user.entity.ts#L161)
