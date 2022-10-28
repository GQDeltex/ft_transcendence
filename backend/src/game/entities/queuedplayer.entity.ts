import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class QueuedPlayer {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => User, { eager: true, cascade: true, nullable: false })
  @JoinColumn({ name: 'playerId' })
  user: User;

  @Column()
  playerId: number;
}
