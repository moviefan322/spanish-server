import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  score: number;

  @Column()
  outOf: number;
}
