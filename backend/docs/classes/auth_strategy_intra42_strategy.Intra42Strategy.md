[backend](../README.md) / [Exports](../modules.md) / [auth/strategy/intra42.strategy](../modules/auth_strategy_intra42_strategy.md) / Intra42Strategy

# Class: Intra42Strategy

[auth/strategy/intra42.strategy](../modules/auth_strategy_intra42_strategy.md).Intra42Strategy

## Hierarchy

- `any`

  ↳ **`Intra42Strategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_intra42_strategy.Intra42Strategy.md#constructor)

### Properties

- [configService](auth_strategy_intra42_strategy.Intra42Strategy.md#configservice)

### Methods

- [clean\_42\_title](auth_strategy_intra42_strategy.Intra42Strategy.md#clean_42_title)
- [titusPullus](auth_strategy_intra42_strategy.Intra42Strategy.md#tituspullus)
- [validate](auth_strategy_intra42_strategy.Intra42Strategy.md#validate)

## Constructors

### constructor

• **new Intra42Strategy**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Overrides

PassportStrategy(Strategy, &#x27;intra42&#x27;).constructor

#### Defined in

[src/auth/strategy/intra42.strategy.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/intra42.strategy.ts#L13)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/auth/strategy/intra42.strategy.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/intra42.strategy.ts#L13)

## Methods

### clean\_42\_title

▸ `Private` **clean_42_title**(`input`, `index`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | { `id`: `number` ; `name`: `string`  }[] |
| `index` | `number` |

#### Returns

`string`[]

#### Defined in

[src/auth/strategy/intra42.strategy.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/intra42.strategy.ts#L48)

___

### titusPullus

▸ `Private` **titusPullus**(`input`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | { `created_at`: `string` ; `id`: `number` ; `selected`: `boolean` ; `title_id`: `number` ; `updated_at`: `string` ; `user_id`: `number`  }[] |

#### Returns

`number`

#### Defined in

[src/auth/strategy/intra42.strategy.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/intra42.strategy.ts#L63)

___

### validate

▸ **validate**(`accessToken`, `refreshToken`, `profile`, `done`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |
| `refreshToken` | `string` |
| `profile` | `any` |
| `done` | `VerifyCallBack` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/auth/strategy/intra42.strategy.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/auth/strategy/intra42.strategy.ts#L22)
