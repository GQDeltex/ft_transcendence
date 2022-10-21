[backend](../README.md) / [Exports](../modules.md) / [auth/guard/intra42.guard](../modules/auth_guard_intra42_guard.md) / Intra42OAuthGuard

# Class: Intra42OAuthGuard

[auth/guard/intra42.guard](../modules/auth_guard_intra42_guard.md).Intra42OAuthGuard

## Hierarchy

- `IAuthGuard`

  ↳ **`Intra42OAuthGuard`**

## Table of contents

### Constructors

- [constructor](auth_guard_intra42_guard.Intra42OAuthGuard.md#constructor)

### Properties

- [configService](auth_guard_intra42_guard.Intra42OAuthGuard.md#configservice)
- [arguments](auth_guard_intra42_guard.Intra42OAuthGuard.md#arguments)
- [caller](auth_guard_intra42_guard.Intra42OAuthGuard.md#caller)
- [length](auth_guard_intra42_guard.Intra42OAuthGuard.md#length)
- [name](auth_guard_intra42_guard.Intra42OAuthGuard.md#name)

### Methods

- [canActivate](auth_guard_intra42_guard.Intra42OAuthGuard.md#canactivate)
- [getAuthenticateOptions](auth_guard_intra42_guard.Intra42OAuthGuard.md#getauthenticateoptions)
- [handleRequest](auth_guard_intra42_guard.Intra42OAuthGuard.md#handlerequest)
- [logIn](auth_guard_intra42_guard.Intra42OAuthGuard.md#login)
- [[hasInstance]](auth_guard_intra42_guard.Intra42OAuthGuard.md#[hasinstance])
- [apply](auth_guard_intra42_guard.Intra42OAuthGuard.md#apply)
- [bind](auth_guard_intra42_guard.Intra42OAuthGuard.md#bind)
- [call](auth_guard_intra42_guard.Intra42OAuthGuard.md#call)
- [toString](auth_guard_intra42_guard.Intra42OAuthGuard.md#tostring)

## Constructors

### constructor

• **new Intra42OAuthGuard**(`configService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configService` | `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\> |

#### Overrides

AuthGuard(&#x27;intra42&#x27;).constructor

#### Defined in

[src/auth/guard/intra42.guard.ts:9](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/guard/intra42.guard.ts#L9)

## Properties

### configService

• `Private` `Readonly` **configService**: `ConfigService`<`Record`<`string`, `unknown`\>, ``false``\>

#### Defined in

[src/auth/guard/intra42.guard.ts:9](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/guard/intra42.guard.ts#L9)

___

### arguments

▪ `Static` **arguments**: `any`

#### Inherited from

AuthGuard('intra42').arguments

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:310

___

### caller

▪ `Static` **caller**: `Function`

#### Inherited from

AuthGuard('intra42').caller

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:311

___

### length

▪ `Static` `Readonly` **length**: `number`

#### Inherited from

AuthGuard('intra42').length

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:307

___

### name

▪ `Static` `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

AuthGuard('intra42').name

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:97

## Methods

### canActivate

▸ **canActivate**(`context`): `boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

#### Overrides

AuthGuard(&#x27;intra42&#x27;).canActivate

#### Defined in

[src/auth/guard/intra42.guard.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/guard/intra42.guard.ts#L13)

___

### getAuthenticateOptions

▸ **getAuthenticateOptions**(`context`): `undefined` \| `IAuthModuleOptions`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`undefined` \| `IAuthModuleOptions`<`any`\>

#### Inherited from

AuthGuard('intra42').getAuthenticateOptions

#### Defined in

node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

___

### handleRequest

▸ **handleRequest**<`TUser`\>(`err`, `user`, `info`, `context`, `status?`): `TUser`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TUser` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |
| `user` | `any` |
| `info` | `any` |
| `context` | `ExecutionContext` |
| `status?` | `any` |

#### Returns

`TUser`

#### Inherited from

AuthGuard('intra42').handleRequest

#### Defined in

node_modules/@nestjs/passport/dist/auth.guard.d.ts:8

___

### logIn

▸ **logIn**<`TRequest`\>(`request`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TRequest` | extends `Object` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `TRequest` |

#### Returns

`Promise`<`void`\>

#### Inherited from

AuthGuard('intra42').logIn

#### Defined in

node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

___

### [hasInstance]

▸ `Static` **[hasInstance]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

AuthGuard('intra42').\_\_@hasInstance@32

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:162

___

### apply

▸ `Static` **apply**(`this`, `thisArg`, `argArray?`): `any`

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `Function` | - |
| `thisArg` | `any` | The object to be used as the this object. |
| `argArray?` | `any` | A set of arguments to be passed to the function. |

#### Returns

`any`

#### Inherited from

AuthGuard('intra42').apply

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:286

___

### bind

▸ `Static` **bind**(`this`, `thisArg`, ...`argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `Function` | - |
| `thisArg` | `any` | An object to which the this keyword can refer inside the new function. |
| `...argArray` | `any`[] | A list of arguments to be passed to the new function. |

#### Returns

`any`

#### Inherited from

AuthGuard('intra42').bind

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:301

___

### call

▸ `Static` **call**(`this`, `thisArg`, ...`argArray`): `any`

Calls a method of an object, substituting another object for the current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `Function` | - |
| `thisArg` | `any` | The object to be used as the current object. |
| `...argArray` | `any`[] | A list of arguments to be passed to the method. |

#### Returns

`any`

#### Inherited from

AuthGuard('intra42').call

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:293

___

### toString

▸ `Static` **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

AuthGuard('intra42').toString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:304
