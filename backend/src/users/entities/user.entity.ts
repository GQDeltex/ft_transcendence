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

  @ManyToMany(() => User, (user) => user.blockedBy, {
    nullable: true,
  })
  @JoinTable()
  blocking?: User[];

  @RelationId('blocking')
  blocking_id: number[] | null;

  @ManyToMany(() => User, (user) => user.blocking, {
    cascade: true,
    nullable: true,
  })
  blockedBy?: User[];

  @RelationId('blockedBy')
  blockedBy_id: number[] | null;

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

  public get blocks(): number[] {
    if (this.blocking_id === null) return this.blockedBy_id ?? [];
    if (this.blockedBy_id === null) return this.blocking_id ?? [];
    return this.blocking_id.concat(
      this.blockedBy_id.filter(
        // typescript being gay after all the null assertions it still complains that it can be null
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (blocked) => this.blocking_id.indexOf(blocked) < 0,
      ),
    );
  }
}
