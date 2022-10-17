import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChannelUser } from './channeluser.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ default: true })
  @Field()
  private: boolean;

  @Column({ default: '' })
  password: string;

  @Field(() => [Int])
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel)
  userList: ChannelUser[];
}
