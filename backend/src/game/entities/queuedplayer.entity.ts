import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QueuedPlayer {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', unique: true })
  playerId: number;
}
