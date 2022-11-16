import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChannelUser } from '../channel-user/entities/channel-user.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: 'int' })
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

  @Field(() => [ChannelUser])
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.channel, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  userList: ChannelUser[];
}
