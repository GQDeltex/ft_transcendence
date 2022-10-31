[backend](../README.md) / [Exports](../modules.md) / [game/game.gateway](../modules/game_game_gateway.md) / GameGateway

# Class: GameGateway

[game/game.gateway](../modules/game_game_gateway.md).GameGateway

## Table of contents

### Constructors

- [constructor](game_game_gateway.GameGateway.md#constructor)

### Properties

- [gameService](game_game_gateway.GameGateway.md#gameservice)
- [server](game_game_gateway.GameGateway.md#server)

### Methods

- [handleMessage](game_game_gateway.GameGateway.md#handlemessage)
- [handleQueueIn](game_game_gateway.GameGateway.md#handlequeuein)
- [startGame](game_game_gateway.GameGateway.md#startgame)

## Constructors

### constructor

• **new GameGateway**(`gameService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameService` | [`GameService`](game_game_service.GameService.md) |

#### Defined in

[src/game/game.gateway.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L38)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/game.gateway.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L40)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/game/game.gateway.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L37)

## Methods

### handleMessage

▸ **handleMessage**(`client`, `jwtPayload`, `changeDir`, `score`, `name`, `gameId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `changeDir` | `number` \| `number`[] |
| `score` | `number`[] |
| `name` | `number` |
| `gameId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:43](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L43)

___

### handleQueueIn

▸ **handleQueueIn**(`client`, `jwtPayload`, `event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `event` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:63](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L63)

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

[src/game/game.gateway.ts:75](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L75)
