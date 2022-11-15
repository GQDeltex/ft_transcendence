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

- [claimVictory](game_game_gateway.GameGateway.md#claimvictory)
- [handleBlur](game_game_gateway.GameGateway.md#handleblur)
- [handleDisconnect](game_game_gateway.GameGateway.md#handledisconnect)
- [handleFocus](game_game_gateway.GameGateway.md#handlefocus)
- [handleInviteGame](game_game_gateway.GameGateway.md#handleinvitegame)
- [handleMessage](game_game_gateway.GameGateway.md#handlemessage)
- [handleQueueIn](game_game_gateway.GameGateway.md#handlequeuein)
- [handleStream](game_game_gateway.GameGateway.md#handlestream)
- [startGame](game_game_gateway.GameGateway.md#startgame)

## Constructors

### constructor

• **new GameGateway**(`gameService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameService` | [`GameService`](game_game_service.GameService.md) |

#### Defined in

[src/game/game.gateway.ts:40](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L40)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/game.gateway.ts:42](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L42)

___

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/game/game.gateway.ts:38](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L38)

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

[src/game/game.gateway.ts:74](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L74)

___

### handleBlur

▸ **handleBlur**(`client`, `gameId`, `cowardId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |
| `cowardId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:56](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L56)

___

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

[src/game/game.gateway.ts:45](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L45)

___

### handleFocus

▸ **handleFocus**(`client`, `gameId`, `cowardId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |
| `cowardId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:65](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L65)

___

### handleInviteGame

▸ **handleInviteGame**(`client`, `jwtPayload`, `gameId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `gameId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:142](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L142)

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

[src/game/game.gateway.ts:82](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L82)

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

[src/game/game.gateway.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L107)

___

### handleStream

▸ **handleStream**(`client`, `jwtPayload`, `event`, `gameId`): `Promise`<`undefined` \| { `player1Id`: `number` = game.player1.id; `player2Id`: `number` = game.player2.id }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `jwtPayload` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `event` | `string` |
| `gameId` | `number` |

#### Returns

`Promise`<`undefined` \| { `player1Id`: `number` = game.player1.id; `player2Id`: `number` = game.player2.id }\>

#### Defined in

[src/game/game.gateway.ts:126](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L126)

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

[src/game/game.gateway.ts:152](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L152)
