import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Channel } from './channel.entity';
import { User } from '../../../users/entities/user.entity';
import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChannelUser {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Field(() => [Int])
  @ManyToOne(() => User)
  user: User;

  @Field(() => [Int])
  @ManyToOne(() => Channel)
  channel: Channel;

  @Column({ default: false })
  @Field()
  admin: boolean;

  @Column({ default: false })
  @Field()
  owner: boolean;

  @Column({ default: false })
  @Field()
  ban: boolean;

  @Column({ nullable: true })
  @Field()
  unbantime: Date;

  @Column({ default: false })
  @Field()
  mute: boolean;

  @Column({ nullable: true })
  @Field()
  unmutetime: Date;
}
