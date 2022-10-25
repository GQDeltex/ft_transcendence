[backend](../README.md) / [Exports](../modules.md) / [auth/strategy/jwt.strategy](../modules/auth_strategy_jwt_strategy.md) / JwtStrategy

# Class: JwtStrategy

[auth/strategy/jwt.strategy](../modules/auth_strategy_jwt_strategy.md).JwtStrategy

## Hierarchy

- `Strategy`<`this`\>

  ↳ **`JwtStrategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_jwt_strategy.JwtStrategy.md#constructor)

### Properties

- [configService](auth_strategy_jwt_strategy.JwtStrategy.md#configservice)
- [name](auth_strategy_jwt_strategy.JwtStrategy.md#name)

### Methods

- [authenticate](auth_strategy_jwt_strategy.JwtStrategy.md#authenticate)
- [error](auth_strategy_jwt_strategy.JwtStrategy.md#error)
- [fail](auth_strategy_jwt_strategy.JwtStrategy.md#fail)
- [pass](auth_strategy_jwt_strategy.JwtStrategy.md#pass)
- [redirect](auth_strategy_jwt_strategy.JwtStrategy.md#redirect)
- [success](auth_strategy_jwt_strategy.JwtStrategy.md#success)
- [validate](auth_strategy_jwt_strategy.JwtStrategy.md#validate)

## Constructors

### constructor

• **new JwtStrategy**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Overrides

PassportStrategy(Strategy).constructor

#### Defined in

[src/auth/strategy/jwt.strategy.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/jwt.strategy.ts#L14)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/auth/strategy/jwt.strategy.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/jwt.strategy.ts#L14)

___

### name

• **name**: `string`

#### Inherited from

PassportStrategy(Strategy).name

#### Defined in

node_modules/@types/passport-jwt/index.d.ts:19

## Methods

### authenticate

▸ **authenticate**(`req`, `options?`): `void`

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> | The request to authenticate. |
| `options?` | `any` | Options passed to the strategy. |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).authenticate

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:26

___

### error

▸ **error**(`err`): `void`

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

**`Api`**

public

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).error

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:96

___

### fail

▸ **fail**(`challenge`, `status`): `void`

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

**`Api`**

public

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `challenge` | `any` | (Can also be an object with 'message' and 'type' fields). |
| `status` | `number` |  |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).fail

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:60

▸ **fail**(`status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).fail

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:61

___

### pass

▸ **pass**(): `void`

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

**`Api`**

public

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).pass

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:84

___

### redirect

▸ **redirect**(`url`, `status?`): `void`

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

**`Api`**

public

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `status?` | `number` |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).redirect

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:73

___

### success

▸ **success**(`user`, `info?`): `void`

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

**`Api`**

public

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `any` |
| `info?` | `any` |

#### Returns

`void`

#### Inherited from

PassportStrategy(Strategy).success

#### Defined in

node_modules/@types/passport-strategy/index.d.ts:48

___

### validate

▸ **validate**(`payload`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/auth/strategy/jwt.strategy.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/jwt.strategy.ts#L32)
