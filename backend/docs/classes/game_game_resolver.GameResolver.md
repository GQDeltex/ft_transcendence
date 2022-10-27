[backend](../README.md) / [Exports](../modules.md) / [game/game.resolver](../modules/game_game_resolver.md) / GameResolver

# Class: GameResolver

[game/game.resolver](../modules/game_game_resolver.md).GameResolver

## Table of contents

### Constructors

- [constructor](game_game_resolver.GameResolver.md#constructor)

### Properties

- [gameService](game_game_resolver.GameResolver.md#gameservice)

### Methods

- [findAll](game_game_resolver.GameResolver.md#findall)
- [findOne](game_game_resolver.GameResolver.md#findone)

## Constructors

### constructor

• **new GameResolver**(`gameService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameService` | [`GameService`](game_game_service.GameService.md) |

#### Defined in

[src/game/game.resolver.ts:11](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.resolver.ts#L11)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/game.resolver.ts:11](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.resolver.ts#L11)

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

[src/game/game.resolver.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.resolver.ts#L13)

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

[src/game/game.resolver.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.resolver.ts#L18)
