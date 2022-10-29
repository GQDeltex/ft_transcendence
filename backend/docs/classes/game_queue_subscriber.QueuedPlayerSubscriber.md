[backend](../README.md) / [Exports](../modules.md) / [game/queue.subscriber](../modules/game_queue_subscriber.md) / QueuedPlayerSubscriber

# Class: QueuedPlayerSubscriber

[game/queue.subscriber](../modules/game_queue_subscriber.md).QueuedPlayerSubscriber

## Implements

- `EntitySubscriberInterface`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\>

## Table of contents

### Constructors

- [constructor](game_queue_subscriber.QueuedPlayerSubscriber.md#constructor)

### Properties

- [gameService](game_queue_subscriber.QueuedPlayerSubscriber.md#gameservice)
- [queuedPlayerRepository](game_queue_subscriber.QueuedPlayerSubscriber.md#queuedplayerrepository)

### Methods

- [afterInsert](game_queue_subscriber.QueuedPlayerSubscriber.md#afterinsert)
- [listenTo](game_queue_subscriber.QueuedPlayerSubscriber.md#listento)

## Constructors

### constructor

• **new QueuedPlayerSubscriber**(`dataSource`, `gameService`, `queuedPlayerRepository`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `DataSource` |
| `gameService` | [`GameService`](game_game_service.GameService.md) |
| `queuedPlayerRepository` | `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\> |

#### Defined in

[src/game/queue.subscriber.ts:16](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/queue.subscriber.ts#L16)

## Properties

### gameService

• `Private` `Readonly` **gameService**: [`GameService`](game_game_service.GameService.md)

#### Defined in

[src/game/queue.subscriber.ts:18](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/queue.subscriber.ts#L18)

___

### queuedPlayerRepository

• `Private` `Readonly` **queuedPlayerRepository**: `Repository`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\>

#### Defined in

[src/game/queue.subscriber.ts:20](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/queue.subscriber.ts#L20)

## Methods

### afterInsert

▸ **afterInsert**(`event`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `InsertEvent`<[`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

EntitySubscriberInterface.afterInsert

#### Defined in

[src/game/queue.subscriber.ts:29](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/queue.subscriber.ts#L29)

___

### listenTo

▸ **listenTo**(): typeof [`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)

#### Returns

typeof [`QueuedPlayer`](game_entities_queuedplayer_entity.QueuedPlayer.md)

#### Implementation of

EntitySubscriberInterface.listenTo

#### Defined in

[src/game/queue.subscriber.ts:25](https://github.com/GQDeltex/ft_transcendence/blob/main/backend/src/game/queue.subscriber.ts#L25)
