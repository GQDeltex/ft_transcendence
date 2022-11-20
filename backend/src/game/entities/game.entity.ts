import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
export class Vector {
  constructor(_x = 0, _y = 0) {
    this.x = _x;
    this.y = _y;
  }
  @Field(() => Float) x = 0;
  @Field(() => Float) y = 0;
}

@ObjectType()
export class GameLogData {
  @Field() timestamp: number;
  @Field() name: string;
  @Field(() => Vector) ballDirection: Vector = new Vector();
  @Field(() => Vector) ballPosition: Vector = new Vector();
  @Field(() => Float) paddleHostDirection = 0;
  @Field(() => Float) paddleClientDirection = 0;
  @Field(() => [Int]) score: number[] = [0, 0];
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

  @Field(() => [GameLogData], { nullable: 'items' })
  @Column({ type: 'jsonb', default: [] })
  logData: GameLogData[];

  @Column({ type: 'integer', default: 0 })
  totalPauseTime: number;

  @Column({ type: 'timestamptz', default: new Date(0) })
  startTime: Date;

  @Field()
  @Column({ default: false })
  isReplayHost: boolean;

  @Field()
  @Column({ default: '' })
  replayUrl: string;
}
