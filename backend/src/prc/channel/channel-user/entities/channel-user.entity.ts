import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Channel } from '../../entities/channel.entity';
import { User } from '../../../../users/entities/user.entity';
import {
  ManyToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ChannelUser {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Int)
  @Column()
  user_id: number;

  @ManyToOne(() => Channel)
  @JoinColumn({ name: 'channel_name', referencedColumnName: 'name' })
  channel: Channel;

  @Field(() => String)
  @Column()
  channel_name: string;

  @Column({ default: false })
  @Field()
  admin: boolean;

  @Column({ default: false })
  @Field()
  owner: boolean;

  @Column({ default: false })
  @Field()
  ban: boolean;

  @Column({ default: false })
  @Field()
  mute: boolean;
}
