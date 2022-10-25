[backend](../README.md) / [Exports](../modules.md) / [game/game.gateway](../modules/game_game_gateway.md) / GameGateway

# Class: GameGateway

[game/game.gateway](../modules/game_game_gateway.md).GameGateway

## Table of contents

### Constructors

- [constructor](game_game_gateway.GameGateway.md#constructor)

### Properties

- [server](game_game_gateway.GameGateway.md#server)

### Methods

- [handleMessage](game_game_gateway.GameGateway.md#handlemessage)

## Constructors

### constructor

• **new GameGateway**()

## Properties

### server

• **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/game/game.gateway.ts:32](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L32)

## Methods

### handleMessage

▸ **handleMessage**(`client`, `jwtToken`, `to`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Socket`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\> |
| `jwtToken` | [`JwtPayload`](../interfaces/auth_strategy_jwt_strategy.JwtPayload.md) |
| `to` | `unknown` |

#### Returns

`void`

#### Defined in

[src/game/game.gateway.ts:34](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/game.gateway.ts#L34)
