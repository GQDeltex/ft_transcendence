[backend](../README.md) / [Exports](../modules.md) / [auth/strategy/intra42.strategy](../modules/auth_strategy_intra42_strategy.md) / Intra42Strategy

# Class: Intra42Strategy

[auth/strategy/intra42.strategy](../modules/auth_strategy_intra42_strategy.md).Intra42Strategy

## Hierarchy

- `any`

  ↳ **`Intra42Strategy`**

## Table of contents

### Constructors

- [constructor](auth_strategy_intra42_strategy.Intra42Strategy.md#constructor)

### Methods

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

[src/auth/strategy/intra42.strategy.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/strategy/intra42.strategy.ts#L13)

## Methods

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

[src/auth/strategy/intra42.strategy.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/strategy/intra42.strategy.ts#L22)
