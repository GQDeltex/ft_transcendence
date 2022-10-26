import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class QueuedPlayer {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: false })
  player1: User;
}
