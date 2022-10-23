import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { ChannelUser } from '../../prc/channel/channel-user/entities/channel-user.entity';

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
  following?: User[];

  @RelationId('following')
  following_id: number[] | null;

  @ManyToMany(() => User, (user) => user.following, {
    cascade: true,
    nullable: true,
  })
  followers?: User[];

  @RelationId('followers')
  followers_id: number[] | null;

  @Field(() => [ChannelUser], { nullable: true })
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  channelList?: ChannelUser[];

  public isInChannel(channelName: string): boolean {
    const result = this.channelList?.some(
      (channelUser) => channelUser.channel_name === channelName,
    );
    return !(typeof result === 'undefined' || !result);
  }
}
