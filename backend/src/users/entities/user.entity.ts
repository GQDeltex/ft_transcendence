import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ChannelUser } from '../../prc/channel/entities/channeluser.entity';

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

  @ManyToMany(() => User, (user) => user.followers, {
    nullable: true,
  })
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following, {
    cascade: true,
    nullable: true,
  })
  followers: User[];

  @Field(() => [ChannelUser], { nullable: true })
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  channelList?: ChannelUser[];
}
