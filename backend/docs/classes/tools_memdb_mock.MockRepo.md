[backend](../README.md) / [Exports](../modules.md) / [tools/memdb.mock](../modules/tools_memdb_mock.md) / MockRepo

# Class: MockRepo

[tools/memdb.mock](../modules/tools_memdb_mock.md).MockRepo

## Table of contents

### Constructors

- [constructor](tools_memdb_mock.MockRepo.md#constructor)

### Properties

- [entity](tools_memdb_mock.MockRepo.md#entity)
- [hasDbSetup](tools_memdb_mock.MockRepo.md#hasdbsetup)
- [key](tools_memdb_mock.MockRepo.md#key)
- [options](tools_memdb_mock.MockRepo.md#options)
- [repo](tools_memdb_mock.MockRepo.md#repo)
- [source](tools_memdb_mock.MockRepo.md#source)
- [testData](tools_memdb_mock.MockRepo.md#testdata)

### Methods

- [clearRepo](tools_memdb_mock.MockRepo.md#clearrepo)
- [destroyRepo](tools_memdb_mock.MockRepo.md#destroyrepo)
- [getProvider](tools_memdb_mock.MockRepo.md#getprovider)
- [getTestEntity](tools_memdb_mock.MockRepo.md#gettestentity)
- [setupDb](tools_memdb_mock.MockRepo.md#setupdb)

## Constructors

### constructor

• **new MockRepo**(`key`, `entity`, `testData?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `entity` | `any` |
| `testData?` | `any` |

#### Defined in

[src/tools/memdb.mock.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L14)

## Properties

### entity

• `Private` `Readonly` **entity**: `any`

#### Defined in

[src/tools/memdb.mock.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L16)

___

### hasDbSetup

• `Private` **hasDbSetup**: `boolean` = `false`

#### Defined in

[src/tools/memdb.mock.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L12)

___

### key

• `Private` `Readonly` **key**: `string`

#### Defined in

[src/tools/memdb.mock.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L15)

___

### options

• `Private` **options**: `any` = `{}`

#### Defined in

[src/tools/memdb.mock.ts:9](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L9)

___

### repo

• `Private` **repo**: `Repository`<`any`\>

#### Defined in

[src/tools/memdb.mock.ts:10](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L10)

___

### source

• `Private` **source**: `DataSource`

#### Defined in

[src/tools/memdb.mock.ts:11](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L11)

___

### testData

• `Private` `Optional` `Readonly` **testData**: `any`

#### Defined in

[src/tools/memdb.mock.ts:17](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L17)

## Methods

### clearRepo

▸ **clearRepo**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdb.mock.ts:70](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L70)

___

### destroyRepo

▸ **destroyRepo**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdb.mock.ts:75](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L75)

___

### getProvider

▸ **getProvider**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `provide` | `string` \| `Function` |
| `useFactory` | () => `Promise`<`Repository`<`any`\>\> |

#### Defined in

[src/tools/memdb.mock.ts:48](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L48)

___

### getTestEntity

▸ **getTestEntity**(`options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[src/tools/memdb.mock.ts:39](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L39)

___

### setupDb

▸ **setupDb**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdb.mock.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdb.mock.ts#L43)