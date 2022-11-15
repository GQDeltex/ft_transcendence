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

- [claimVictory](game_game_service.GameService.md#claimvictory)
- [create](game_game_service.GameService.md#create)
- [dequeuePlayer](game_game_service.GameService.md#dequeueplayer)
- [endGame](game_game_service.GameService.md#endgame)
- [findAll](game_game_service.GameService.md#findall)
- [findOne](game_game_service.GameService.md#findone)
- [killGame](game_game_service.GameService.md#killgame)
- [pauseGame](game_game_service.GameService.md#pausegame)
- [queuePlayer](game_game_service.GameService.md#queueplayer)
- [saveScore](game_game_service.GameService.md#savescore)
- [unpauseGame](game_game_service.GameService.md#unpausegame)

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

[src/game/game.service.ts:13](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L13)

## Properties

### gameGateway

• `Private` `Readonly` **gameGateway**: [`GameGateway`](game_game_gateway.GameGateway.md)

#### Defined in

[src/game/game.service.ts:19](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L19)

___

### gameRepository

• `Private` `Readonly` **gameRepository**: `Repository`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/game/game.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L14)

___

### queuedPlayerRepository

• `Private` `Readonly` **queuedPlayerRepository**: `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\>

#### Defined in

[src/game/game.service.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L16)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/game/game.service.ts:17](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L17)

## Methods

### claimVictory

▸ **claimVictory**(`client`, `gameId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:134](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L134)

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

[src/game/game.service.ts:22](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L22)

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

[src/game/game.service.ts:64](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L64)

___

### endGame

▸ **endGame**(`gameId`, `score`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameId` | `number` |
| `score` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:79](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L79)

___

### findAll

▸ **findAll**(`searchWhere?`, `searchUserId?`): `Promise`<[`Game`](game_entities_game_entity.Game.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchWhere?` | `FindOptionsWhere`<[`Game`](game_entities_game_entity.Game.md)\> \| `FindOptionsWhere`<[`Game`](game_entities_game_entity.Game.md)\>[] |
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

[src/game/game.service.ts:51](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L51)

___

### killGame

▸ **killGame**(`userId`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/game/game.service.ts:91](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L91)

___

### pauseGame

▸ **pauseGame**(`client`, `gameId`, `cowardId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |
| `cowardId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:112](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L112)

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

[src/game/game.service.ts:55](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L55)

___

### saveScore

▸ **saveScore**(`gameId`, `score`): `Promise`<`void`\>

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

### unpauseGame

▸ **unpauseGame**(`client`, `gameId`, `cowardId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |
| `cowardId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:122](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L122)
