[backend](../README.md) / [Exports](../modules.md) / [auth/guard/twoFA.guard](../modules/auth_guard_twoFA_guard.md) / TwoFAGuard

# Class: TwoFAGuard

[auth/guard/twoFA.guard](../modules/auth_guard_twoFA_guard.md).TwoFAGuard

## Implements

- `CanActivate`

## Table of contents

### Constructors

- [constructor](auth_guard_twoFA_guard.TwoFAGuard.md#constructor)

### Methods

- [canActivate](auth_guard_twoFA_guard.TwoFAGuard.md#canactivate)

## Constructors

### constructor

• **new TwoFAGuard**()

## Methods

### canActivate

▸ **canActivate**(`context`): `boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[src/auth/guard/twoFA.guard.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/95a7401/backend/src/auth/guard/twoFA.guard.ts#L13)
