import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  Repository,
} from 'typeorm';
import { QueuedPlayer } from './entities/queuedplayer.entity';
import { GameService } from './game.service';

@EventSubscriber()
export class QueuedPlayerSubscriber
  implements EntitySubscriberInterface<QueuedPlayer>
{
  constructor(
    dataSource: DataSource,
    private readonly gameService: GameService,
    @InjectRepository(QueuedPlayer)
    private readonly queuedPlayerRepository: Repository<QueuedPlayer>,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return QueuedPlayer;
  }

  async afterInsert() {
    const players: QueuedPlayer[] = await this.queuedPlayerRepository.find({
      take: 2,
    }); // Nimm Zwei!
    if (players.length == 2) {
      await this.gameService.create(players[0], players[1]);
    }
  }
}
