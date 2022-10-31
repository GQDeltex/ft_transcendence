[backend](../README.md) / [Exports](../modules.md) / [game/game.gateway](../modules/game_game_gateway.md) / GameGateway

# Class: GameGateway

[game/game.gateway](../modules/game_game_gateway.md).GameGateway

## Implements

- `OnGatewayDisconnect`

## Table of contents

### Constructors

- [constructor](game_game_gateway.GameGateway.md#constructor)

### Properties

- [gameService](game_game_gateway.GameGateway.md#gameservice)
- [server](game_game_gateway.GameGateway.md#server)

### Methods

- [handleDisconnect](game_game_gateway.GameGateway.md#handledisconnect)
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

[src/game/game.gateway.ts:39](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L39)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/game.gateway.ts:41](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L41)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/game/game.gateway.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L38)

## Methods

### handleDisconnect

▸ **handleDisconnect**(`client`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

OnGatewayDisconnect.handleDisconnect

#### Defined in

[src/game/game.gateway.ts:44](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L44)

___

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

[src/game/game.gateway.ts:49](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L49)

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

[src/game/game.gateway.ts:69](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L69)

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

[src/game/game.gateway.ts:81](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L81)
