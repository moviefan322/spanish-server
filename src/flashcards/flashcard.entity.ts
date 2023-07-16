import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spanish: string;

  @Column()
  english: string;

  @Column({ default: true })
  priority: boolean;

  @Column({ default: 0 })
  correctGuess: number;

  @Column({ default: 0 })
  falseGuess: number;

  @Column('simple-array', { default: [] })
  last5: string[];
}
