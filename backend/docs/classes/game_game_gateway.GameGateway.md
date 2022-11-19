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
- [handleBigGameDataRequest](game_game_gateway.GameGateway.md#handlebiggamedatarequest)
- [handleBlur](game_game_gateway.GameGateway.md#handleblur)
- [handleDisconnect](game_game_gateway.GameGateway.md#handledisconnect)
- [handleFocus](game_game_gateway.GameGateway.md#handlefocus)
- [handleInviteGame](game_game_gateway.GameGateway.md#handleinvitegame)
- [handleMessage](game_game_gateway.GameGateway.md#handlemessage)
- [handleQueueIn](game_game_gateway.GameGateway.md#handlequeuein)
- [handleStream](game_game_gateway.GameGateway.md#handlestream)

## Constructors

### constructor

• **new GameGateway**(`gameService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameService` | [`GameService`](game_game_service.GameService.md) |

#### Defined in

[src/game/game.gateway.ts:37](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L37)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/game.gateway.ts:39](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L39)

___

### server

• `Readonly` **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/game/game.gateway.ts:35](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L35)

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

[src/game/game.gateway.ts:68](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L68)

___

### handleBigGameDataRequest

▸ **handleBigGameDataRequest**(`client`, `gameId`, `requesterId?`, `leftPaddle?`, `rightPaddle?`, `ball?`, `scores?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |
| `requesterId?` | `number` |
| `leftPaddle?` | `any` |
| `rightPaddle?` | `any` |
| `ball?` | `any` |
| `scores?` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:148](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L148)

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

[src/game/game.gateway.ts:50](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L50)

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

[src/game/game.gateway.ts:42](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L42)

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

[src/game/game.gateway.ts:59](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L59)

___

### handleInviteGame

▸ **handleInviteGame**(`client`, `gameId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `gameId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:139](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L139)

___

### handleMessage

▸ **handleMessage**(`client`, `name`, `gameId`, `direction?`, `position?`, `paddleDir?`, `score?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `name` | `number` |
| `gameId` | `number` |
| `direction?` | `Object` |
| `direction.x` | `number` |
| `direction.y` | `number` |
| `position?` | `Object` |
| `position.x` | `number` |
| `position.y` | `number` |
| `paddleDir?` | `number` |
| `score?` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:76](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L76)

___

### handleQueueIn

▸ **handleQueueIn**(`client`, `event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `event` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/game/game.gateway.ts:107](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L107)

___

### handleStream

▸ **handleStream**(`client`, `event`, `gameId`): `Promise`<`undefined` \| { `player1Id`: `number` = game.player1.id; `player2Id`: `number` = game.player2.id }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `event` | `string` |
| `gameId` | `number` |

#### Returns

`Promise`<`undefined` \| { `player1Id`: `number` = game.player1.id; `player2Id`: `number` = game.player2.id }\>

#### Defined in

[src/game/game.gateway.ts:124](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L124)
