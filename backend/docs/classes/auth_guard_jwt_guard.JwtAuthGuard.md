[backend](../README.md) / [Exports](../modules.md) / [auth/guard/jwt.guard](../modules/auth_guard_jwt_guard.md) / JwtAuthGuard

# Class: JwtAuthGuard

[auth/guard/jwt.guard](../modules/auth_guard_jwt_guard.md).JwtAuthGuard

## Hierarchy

- `IAuthGuard`

  ↳ **`JwtAuthGuard`**

## Table of contents

### Constructors

- [constructor](auth_guard_jwt_guard.JwtAuthGuard.md#constructor)

### Properties

- [arguments](auth_guard_jwt_guard.JwtAuthGuard.md#arguments)
- [caller](auth_guard_jwt_guard.JwtAuthGuard.md#caller)
- [length](auth_guard_jwt_guard.JwtAuthGuard.md#length)
- [name](auth_guard_jwt_guard.JwtAuthGuard.md#name)

### Methods

- [canActivate](auth_guard_jwt_guard.JwtAuthGuard.md#canactivate)
- [getAuthenticateOptions](auth_guard_jwt_guard.JwtAuthGuard.md#getauthenticateoptions)
- [getRequest](auth_guard_jwt_guard.JwtAuthGuard.md#getrequest)
- [handleRequest](auth_guard_jwt_guard.JwtAuthGuard.md#handlerequest)
- [logIn](auth_guard_jwt_guard.JwtAuthGuard.md#login)
- [[hasInstance]](auth_guard_jwt_guard.JwtAuthGuard.md#[hasinstance])
- [apply](auth_guard_jwt_guard.JwtAuthGuard.md#apply)
- [bind](auth_guard_jwt_guard.JwtAuthGuard.md#bind)
- [call](auth_guard_jwt_guard.JwtAuthGuard.md#call)
- [toString](auth_guard_jwt_guard.JwtAuthGuard.md#tostring)

## Constructors

### constructor

• **new JwtAuthGuard**(...`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Inherited from

AuthGuard('jwt').constructor

#### Defined in

node_modules/@nestjs/passport/dist/interfaces/type.interface.d.ts:2

## Properties

### arguments

▪ `Static` **arguments**: `any`

#### Inherited from

AuthGuard('jwt').arguments

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:310

___

### caller

▪ `Static` **caller**: `Function`

#### Inherited from

AuthGuard('jwt').caller

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:311

___

### length

▪ `Static` `Readonly` **length**: `number`

#### Inherited from

AuthGuard('jwt').length

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:307

___

### name

▪ `Static` `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

AuthGuard('jwt').name

#### Defined in

node_modules/typescript/lib/lib.es2015.core.d.ts:97

## Methods

### canActivate

▸ **canActivate**(`context`): `boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `ExecutionContext` | Current execution context. Provides access to details about the current request pipeline. |

#### Returns

`boolean` \| `Promise`<`boolean`\> \| `Observable`<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

#### Inherited from

AuthGuard('jwt').canActivate

#### Defined in

node_modules/@nestjs/common/interfaces/features/can-activate.interface.d.ts:21

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

AuthGuard('jwt').getAuthenticateOptions

#### Defined in

node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

___

### getRequest

▸ **getRequest**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

#### Returns

`any`

#### Defined in

[src/auth/guard/jwt.guard.ts:7](https://github.com/GQDeltex/ft_transcendence/blob/fdce073/backend/src/auth/guard/jwt.guard.ts#L7)

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

AuthGuard('jwt').handleRequest

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

AuthGuard('jwt').logIn

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

AuthGuard('jwt').\_\_@hasInstance@32

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

AuthGuard('jwt').apply

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

AuthGuard('jwt').bind

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

AuthGuard('jwt').call

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:293

___

### toString

▸ `Static` **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

AuthGuard('jwt').toString

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:304
