import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChannelUser } from '../../prc/channel/entities/channeluser.entity';
import {
  OneToMany,
  Column,
  Entity,
  PrimaryColumn,
  Index,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryColumn({ type: 'int', unique: true })
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column({ unique: true })
  @Index()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  campus: string;

  @Field()
  @Column()
  country: string;

  @Field(() => [String])
  @Column({ type: String, array: true, nullable: true })
  title: string[];

  @Column({ type: String, nullable: true })
  twoFASecret!: string | null;

  @Field(() => Boolean)
  @Column({ default: false })
  twoFAEnable: boolean;

  @Column({ default: '' })
  @Index()
  socketId: string;

  @Field()
  @Column({ default: 'offline' })
  status: string;

  @Field(() => [ChannelUser], { nullable: true })
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  channelList?: ChannelUser[];
}
