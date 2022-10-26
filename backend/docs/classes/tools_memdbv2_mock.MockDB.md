[backend](../README.md) / [Exports](../modules.md) / [tools/memdbv2.mock](../modules/tools_memdbv2_mock.md) / MockDB

# Class: MockDB

[tools/memdbv2.mock](../modules/tools_memdbv2_mock.md).MockDB

## Table of contents

### Constructors

- [constructor](tools_memdbv2_mock.MockDB.md#constructor)

### Properties

- [didSetupDB](tools_memdbv2_mock.MockDB.md#didsetupdb)
- [didSetupSource](tools_memdbv2_mock.MockDB.md#didsetupsource)
- [key](tools_memdbv2_mock.MockDB.md#key)
- [options](tools_memdbv2_mock.MockDB.md#options)
- [registeredEntities](tools_memdbv2_mock.MockDB.md#registeredentities)
- [source](tools_memdbv2_mock.MockDB.md#source)

### Methods

- [clearSource](tools_memdbv2_mock.MockDB.md#clearsource)
- [destroyDB](tools_memdbv2_mock.MockDB.md#destroydb)
- [destroySource](tools_memdbv2_mock.MockDB.md#destroysource)
- [getProvider](tools_memdbv2_mock.MockDB.md#getprovider)
- [getRepository](tools_memdbv2_mock.MockDB.md#getrepository)
- [prefillDB](tools_memdbv2_mock.MockDB.md#prefilldb)
- [setupDB](tools_memdbv2_mock.MockDB.md#setupdb)
- [setupSource](tools_memdbv2_mock.MockDB.md#setupsource)

## Constructors

### constructor

• **new MockDB**(`key`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Defined in

[src/tools/memdbv2.mock.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L29)

## Properties

### didSetupDB

• `Private` **didSetupDB**: `boolean` = `false`

#### Defined in

[src/tools/memdbv2.mock.ts:26](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L26)

___

### didSetupSource

• `Private` **didSetupSource**: `boolean` = `false`

#### Defined in

[src/tools/memdbv2.mock.ts:27](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L27)

___

### key

• `Private` `Readonly` **key**: `string`

#### Defined in

[src/tools/memdbv2.mock.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L29)

___

### options

• `Private` **options**: `any` = `{}`

#### Defined in

[src/tools/memdbv2.mock.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L22)

___

### registeredEntities

• `Private` **registeredEntities**: `EntityTarget`<`ObjectLiteral`\>[] = `[]`

#### Defined in

[src/tools/memdbv2.mock.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L23)

___

### source

• `Private` **source**: `DataSource`

#### Defined in

[src/tools/memdbv2.mock.ts:24](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L24)

## Methods

### clearSource

▸ **clearSource**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdbv2.mock.ts:71](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L71)

___

### destroyDB

▸ **destroyDB**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdbv2.mock.ts:87](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L87)

___

### destroySource

▸ **destroySource**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdbv2.mock.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L81)

___

### getProvider

▸ **getProvider**<`Entity`\>(`entity`): `Promise`<`Provider`<`any`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `EntitySchema`<`any`, `Entity`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `EntityTarget`<`Entity`\> |

#### Returns

`Promise`<`Provider`<`any`\>\>

#### Defined in

[src/tools/memdbv2.mock.ts:100](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L100)

___

### getRepository

▸ **getRepository**<`Entity`\>(`entity`): `Promise`<`Repository`<`Entity`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `EntitySchema`<`any`, `Entity`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `EntityTarget`<`Entity`\> |

#### Returns

`Promise`<`Repository`<`Entity`\>\>

#### Defined in

[src/tools/memdbv2.mock.ts:92](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L92)

___

### prefillDB

▸ **prefillDB**(`schema`, `entity`): `Promise`<[`MockDB`](tools_memdbv2_mock.MockDB.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `EntityTarget`<`EntitySchema`<`any`\>\> |
| `entity` | `ObjectLiteral` |

#### Returns

`Promise`<[`MockDB`](tools_memdbv2_mock.MockDB.md)\>

#### Defined in

[src/tools/memdbv2.mock.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L50)

___

### setupDB

▸ **setupDB**(): `Promise`<[`MockDB`](tools_memdbv2_mock.MockDB.md)\>

#### Returns

`Promise`<[`MockDB`](tools_memdbv2_mock.MockDB.md)\>

#### Defined in

[src/tools/memdbv2.mock.ts:59](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L59)

___

### setupSource

▸ **setupSource**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/tools/memdbv2.mock.ts:65](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/tools/memdbv2.mock.ts#L65)
