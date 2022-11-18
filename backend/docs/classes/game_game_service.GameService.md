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
- [handleBigGameDataRequest](game_game_service.GameService.md#handlebiggamedatarequest)
- [killGame](game_game_service.GameService.md#killgame)
- [pauseGame](game_game_service.GameService.md#pausegame)
- [queuePlayer](game_game_service.GameService.md#queueplayer)
- [saveScore](game_game_service.GameService.md#savescore)
- [startGame](game_game_service.GameService.md#startgame)
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

[src/game/game.service.ts:14](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L14)

## Properties

### gameGateway

• `Private` `Readonly` **gameGateway**: [`GameGateway`](game_game_gateway.GameGateway.md)

#### Defined in

[src/game/game.service.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L20)

___

### gameRepository

• `Private` `Readonly` **gameRepository**: `Repository`<[`Game`](game_entities_game_entity.Game.md)\>

#### Defined in

[src/game/game.service.ts:15](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L15)

___

### queuedPlayerRepository

• `Private` `Readonly` **queuedPlayerRepository**: `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\>

#### Defined in

[src/game/game.service.ts:17](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L17)

___

### usersService

• `Private` `Readonly` **usersService**: [`UsersService`](users_users_service.UsersService.md)

#### Defined in

[src/game/game.service.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L18)

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

[src/game/game.service.ts:159](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L159)

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

[src/game/game.service.ts:23](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L23)

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

[src/game/game.service.ts:87](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L87)

___

### endGame

▸ **endGame**(`userId`, `gameId`, `score`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `gameId` | `number` |
| `score` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:101](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L101)

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

[src/game/game.service.ts:59](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L59)

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

[src/game/game.service.ts:73](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L73)

___

### handleBigGameDataRequest

▸ **handleBigGameDataRequest**(`clientId`, `gameId`, `requesterId?`, `leftPaddle?`, `rightPaddle?`, `ball?`, `scores?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientId` | `number` |
| `gameId` | `number` |
| `requesterId?` | `number` |
| `leftPaddle?` | `any` |
| `rightPaddle?` | `any` |
| `ball?` | `any` |
| `scores?` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:172](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L172)

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

[src/game/game.service.ts:113](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L113)

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

[src/game/game.service.ts:135](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L135)

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

[src/game/game.service.ts:77](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L77)

___

### saveScore

▸ **saveScore**(`userId`, `gameId`, `score`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `gameId` | `number` |
| `score` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:93](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L93)

___

### startGame

▸ **startGame**(`game`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `game` | [`Game`](game_entities_game_entity.Game.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.service.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L38)

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

[src/game/game.service.ts:146](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.service.ts#L146)
