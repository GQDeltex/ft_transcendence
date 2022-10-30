[backend](../README.md) / [Exports](../modules.md) / [game/game.service](../modules/game_game_service.md) / GameService

# Class: GameService

[game/game.service](../modules/game_game_service.md).GameService

## Table of contents

### Constructors

- [constructor](game_game_service.GameService.md#constructor)

### Properties

- [gameGateway](game_game_service.GameService.md#gamegateway)
- [gameRepository](game_game_service.GameService.md#gamerepository)
- [queuedPlayerRepository](game_game_service.GameService.md#queuedplayerrepository)
- [usersService](game_game_service.GameService.md#usersservice)

### Methods

- [EndGame](game_game_service.GameService.md#endgame)
- [create](game_game_service.GameService.md#create)
- [dequeuePlayer](game_game_service.GameService.md#dequeueplayer)
- [findAll](game_game_service.GameService.md#findall)
- [findOne](game_game_service.GameService.md#findone)
- [queuePlayer](game_game_service.GameService.md#queueplayer)

## Constructors

### constructor

• **new GameService**(`gameRepository`, `queuedPlayerRepository`, `usersService`, `gameGateway`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameRepository` | `Repository`<[`Game`](game_entities_game_entity.Game.md)\> |
| `queuedPlayerRepository` | `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\> |
| `usersService` | [`UsersService`](users_users_service.UsersService.md) |
| `gameGateway` | [`GameGateway`](game_game_gateway.GameGateway.md) |

#### Defined in

[src/game/game.service.ts:12](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L12)

## Properties

### gameGateway

• `Private` `Readonly` **gameGateway**: [`GameGateway`](game_game_gateway.GameGateway.md)

#### Defined in

[src/game/game.service.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L18)

___

### gameRepository

• `Private` `Readonly` **gameRepository**: `Repository`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/game/game.service.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L13)

___

### queuedPlayerRepository

• `Private` `Readonly` **queuedPlayerRepository**: `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\>

#### Defined in

[src/game/game.service.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L15)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/game/game.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L16)

## Methods

### EndGame

▸ **EndGame**(`gameId`, `score`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameId` | `number` |
| `score` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:70](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L70)

___

### create

▸ **create**(`player1`, `player2`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `player1` | [`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md) |
| `player2` | [`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:21](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L21)

___

### dequeuePlayer

▸ **dequeuePlayer**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L63)

___

### findAll

▸ **findAll**(`searchState?`, `searchUserId?`): `Promise`<[`Game`](game_entities_game_entity.Game.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchState?` | [`GameState`](../enums/game_entities_game_entity.GameState.md) |
| `searchUserId?` | `number` |

#### Returns

`Promise`<[`Game`](game_entities_game_entity.Game.md)[]\>

#### Defined in

[src/game/game.service.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L37)

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

[src/game/game.service.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L49)

___

### queuePlayer

▸ **queuePlayer**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:53](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L53)
