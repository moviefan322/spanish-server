import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spanish: string;

  @Column()
  english: string;

  @ManyToOne((_type) => User, (user) => user.flashcards, { eager: false })
  user: User;

  @Column({ default: true })
  priority: boolean;

  @Column({ default: 0 })
  correctGuess: number;

  @Column({ default: 0 })
  falseGuess: number;

  @Column('simple-array', { default: [] })
  last5: string[];
}
