import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    nullable: false,
  })
  id: number;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    default: '',
  })
  firstname: string;

  @Column({
    default: '',
  })
  lastname: string;

  @Column({
    default: '',
  })
  email: string;
}
