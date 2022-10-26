[backend](../README.md) / [Exports](../modules.md) / [game/game.service](../modules/game_game_service.md) / GameService

# Class: GameService

[game/game.service](../modules/game_game_service.md).GameService

## Table of contents

### Constructors

- [constructor](game_game_service.GameService.md#constructor)

### Properties

- [gameRepository](game_game_service.GameService.md#gamerepository)

### Methods

- [findAll](game_game_service.GameService.md#findall)
- [findOne](game_game_service.GameService.md#findone)

## Constructors

### constructor

• **new GameService**(`gameRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameRepository` | `Repository`<[`Game`](game_entities_game_entity.Game.md)\> |

#### Defined in

[src/game/game.service.ts:8](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L8)

## Properties

### gameRepository

• `Private` `Readonly` **gameRepository**: `Repository`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/game/game.service.ts:9](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L9)

## Methods

### findAll

▸ **findAll**(`searchState`): `Promise`<[`Game`](game_entities_game_entity.Game.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchState` | [`GameState`](../enums/game_entities_game_entity.GameState.md) |

#### Returns

`Promise`<[`Game`](game_entities_game_entity.Game.md)[]\>

#### Defined in

[src/game/game.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L12)

___

### findOne

▸ **findOne**(`id`): `Promise`<[`Game`](game_entities_game_entity.Game.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/game/game.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L16)
