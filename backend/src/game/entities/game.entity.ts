import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum GameState {
  STARTING = 'starting',
  RUNNING = 'running',
  ENDED = 'ended',
  PAUSED = 'paused',
}

export enum Priority {
  HOST,
  CLIENT,
  GUEST,
}

@ObjectType()
@Entity()
export class Game {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false, eager: true, cascade: true })
  @JoinColumn({ name: 'player1Id' })
  player1: User;

  @Column()
  player1Id: number;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false, eager: true, cascade: true })
  @JoinColumn({ name: 'player2Id' })
  player2: User;

  @Column()
  player2Id: number;

  @Field(() => Int)
  @Column({ default: 0 })
  score1: number;

  @Field(() => Int)
  @Column({ default: 0 })
  score2: number;

  @Column({ default: new Date(0) })
  player1BlurTime: Date;

  @Column({ default: new Date(0) })
  player2BlurTime: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: GameState,
    default: GameState.STARTING,
  })
  state: GameState;

  @Field()
  @Column({ default: false })
  isReplayHost: boolean;

  @Field()
  @Column({ default: '' })
  replayUrl: string;
}
