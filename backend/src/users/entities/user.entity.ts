import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
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
  email: string;

  @Field()
  @Column()
  intra: string;

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

  @Field(() => [String])
  @Column({ type: String, array: true, nullable: true })
  title: string[];

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column({ default: 'Fluvius' })
  coalition: string;

  @Field()
  @Column()
  campus: string;

  @Field()
  @Column()
  country: string;

  @Field(() => Int)
  @Column({ type: 'integer', default: 0 })
  points: number;

  @Field(() => [Int])
  @Column({ type: 'integer', array: true, default: [] })
  inventory: number[];

  @Column({ type: 'integer', array: true, default: [] })
  equipped: number[];

  @Column({ default: 'offline' })
  status: string;

  @Field(() => GraphQLTimestamp)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastLoggedIn: Date;

  @Column({ type: String, nullable: true })
  twoFASecret!: string | null;

  @Field(() => Boolean)
  @Column({ default: false })
  twoFAEnable: boolean;

  @ManyToMany(() => User, (user) => user.followers, {
    nullable: true,
  })
  @JoinTable()
  following?: User[];

  @RelationId('following')
  following_id: number[];

  @ManyToMany(() => User, (user) => user.following, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  followers?: User[];

  @RelationId('followers')
  followers_id: number[];

  @ManyToMany(() => User, (user) => user.blockedBy, {
    nullable: true,
  })
  @JoinTable()
  blocking?: User[];

  @RelationId('blocking')
  blocking_id: number[];

  @ManyToMany(() => User, (user) => user.blocking, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  blockedBy?: User[];

  @RelationId('blockedBy')
  blockedBy_id: number[];

  @Field(() => [ChannelUser], { nullable: true })
  @OneToMany(() => ChannelUser, (channelUser) => channelUser.user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  channelList?: ChannelUser[];

  @Column({ default: '' })
  @Index()
  socketId: string;

  @ManyToMany(() => User, (user) => user.receivedGameRequests, {
    nullable: true,
  })
  @JoinTable()
  sentGameRequests?: User[];

  @Field(() => [Int], { nullable: 'items', name: 'sentGameRequests' })
  @RelationId('sentGameRequests')
  sentGameRequests_id: number[];

  @ManyToMany(() => User, (user) => user.sentGameRequests, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  receivedGameRequests?: User[];

  @Field(() => [Int], { nullable: 'items', name: 'receivedGameRequests' })
  @RelationId('receivedGameRequests')
  receivedGameRequests_id: number[];

  public isInChannel(channelName: string): boolean {
    const result = this.channelList?.some(
      (channelUser) => channelUser.channel_name === channelName,
    );
    return !(typeof result === 'undefined' || !result);
  }

  public get friends(): number[] {
    return (
      this.followers_id?.filter((follower) =>
        this.following_id?.includes(follower),
      ) ?? []
    );
  }

  public get sentFriendRequests(): number[] {
    return (
      this.following_id?.filter(
        (following) => !this.followers_id?.includes(following),
      ) ?? []
    );
  }

  public get receivedFriendRequests(): number[] {
    return (
      this.followers_id?.filter(
        (follower) => !this.following_id?.includes(follower),
      ) ?? []
    );
  }
}
