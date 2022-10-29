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

  @Field()
  @Column({
    type: 'enum',
    enum: GameState,
    default: GameState.STARTING,
  })
  state: GameState;
}
