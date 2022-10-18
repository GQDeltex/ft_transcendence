import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Channel } from './channel.entity';
import { User } from '../../../users/entities/user.entity';
import { ManyToOne, Column, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ChannelUser {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User;

  @Field(() => Int)
  @Column()
  user_id : number

  @ManyToOne(() => Channel)
  @JoinColumn({ name: "channel_id"})
  channel: Channel;
  
  @Field(() => Int)
  @Column()
  channel_id : number

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
