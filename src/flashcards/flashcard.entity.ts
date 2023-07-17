import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spanish: string;

  @Column()
  english: string;

  @ManyToOne((_type) => User, (user) => user.flashcards, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column({ default: true })
  priority: boolean;

  @Column({ default: 0 })
  @Exclude({ toPlainOnly: true })
  correctGuess: number;

  @Column({ default: 0 })
  @Exclude({ toPlainOnly: true })
  falseGuess: number;

  @Column('simple-array', { default: [] })
  @Exclude({ toPlainOnly: true })
  last5: string[];
}
